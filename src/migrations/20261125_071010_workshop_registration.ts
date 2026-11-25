import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_workshop_sessions_status" AS ENUM('open', 'closed', 'cancelled');
  CREATE TYPE "public"."enum_workshop_registrations_status" AS ENUM('confirmed', 'cancelled');
  CREATE TABLE "workshop_sessions" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "workshop_id" integer NOT NULL,
    "starts_at" timestamp(3) with time zone NOT NULL,
    "ends_at" timestamp(3) with time zone NOT NULL,
    "capacity" numeric NOT NULL,
    "reserved_places" numeric DEFAULT 0 NOT NULL,
    "status" "enum_workshop_sessions_status" DEFAULT 'closed' NOT NULL,
    "internal_notes" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "workshop_registrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "reference" varchar NOT NULL,
    "request_id" varchar NOT NULL,
    "workshop_id" integer NOT NULL,
    "session_id" integer NOT NULL,
    "participant_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "participants" numeric NOT NULL,
    "workshop_title" varchar NOT NULL,
    "session_title" varchar NOT NULL,
    "session_starts_at" timestamp(3) with time zone NOT NULL,
    "session_ends_at" timestamp(3) with time zone NOT NULL,
    "status" "enum_workshop_registrations_status" DEFAULT 'confirmed' NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "workshop_sessions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "workshop_registrations_id" integer;
  ALTER TABLE "workshop_sessions" ADD CONSTRAINT "workshop_sessions_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_registrations" ADD CONSTRAINT "workshop_registrations_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_registrations" ADD CONSTRAINT "workshop_registrations_session_id_workshop_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."workshop_sessions"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "workshop_sessions_workshop_idx" ON "workshop_sessions" USING btree ("workshop_id");
  CREATE INDEX "workshop_sessions_starts_at_idx" ON "workshop_sessions" USING btree ("starts_at");
  CREATE INDEX "workshop_sessions_updated_at_idx" ON "workshop_sessions" USING btree ("updated_at");
  CREATE INDEX "workshop_sessions_created_at_idx" ON "workshop_sessions" USING btree ("created_at");
  CREATE UNIQUE INDEX "workshop_registrations_reference_idx" ON "workshop_registrations" USING btree ("reference");
  CREATE UNIQUE INDEX "workshop_registrations_request_id_idx" ON "workshop_registrations" USING btree ("request_id");
  CREATE INDEX "workshop_registrations_workshop_idx" ON "workshop_registrations" USING btree ("workshop_id");
  CREATE INDEX "workshop_registrations_session_idx" ON "workshop_registrations" USING btree ("session_id");
  CREATE INDEX "workshop_registrations_updated_at_idx" ON "workshop_registrations" USING btree ("updated_at");
  CREATE INDEX "workshop_registrations_created_at_idx" ON "workshop_registrations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_workshop_sessions_fk" FOREIGN KEY ("workshop_sessions_id") REFERENCES "public"."workshop_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_workshop_registrations_fk" FOREIGN KEY ("workshop_registrations_id") REFERENCES "public"."workshop_registrations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_workshop_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("workshop_sessions_id");
  CREATE INDEX "payload_locked_documents_rels_workshop_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("workshop_registrations_id");

  ALTER TABLE workshop_sessions ADD CONSTRAINT workshop_session_capacity CHECK (
    capacity BETWEEN 1 AND 100 AND capacity = trunc(capacity)
    AND reserved_places BETWEEN 0 AND capacity AND reserved_places = trunc(reserved_places)
  );
  ALTER TABLE workshop_sessions ADD CONSTRAINT workshop_session_dates CHECK (ends_at > starts_at);
  ALTER TABLE workshop_registrations ADD CONSTRAINT workshop_registration_group CHECK (
    participants BETWEEN 1 AND 6 AND participants = trunc(participants)
  );

  CREATE FUNCTION maintain_workshop_reservations() RETURNS trigger
  LANGUAGE plpgsql AS $$
  BEGIN
    IF TG_OP = 'INSERT' THEN
      IF NEW.status <> 'confirmed' THEN
        RAISE EXCEPTION 'New registrations must be confirmed' USING ERRCODE = 'PWR01';
      END IF;
      -- UPDATE locks the session and rechecks these predicates against concurrent changes.
      UPDATE workshop_sessions
        SET reserved_places = reserved_places + NEW.participants
        WHERE id = NEW.session_id AND workshop_id = NEW.workshop_id AND status = 'open'
          AND starts_at > clock_timestamp()
          AND starts_at = NEW.session_starts_at AND ends_at = NEW.session_ends_at
          AND reserved_places + NEW.participants <= capacity;
      IF NOT FOUND THEN
        RAISE EXCEPTION 'Workshop session unavailable' USING ERRCODE = 'PWR01';
      END IF;
    ELSE
      IF (to_jsonb(NEW) - 'status' - 'updated_at') <> (to_jsonb(OLD) - 'status' - 'updated_at')
        OR (OLD.status = 'cancelled' AND NEW.status <> 'cancelled') THEN
        RAISE EXCEPTION 'Registration history is immutable' USING ERRCODE = 'PWR02';
      END IF;
      IF OLD.status = 'confirmed' AND NEW.status = 'cancelled' THEN
        UPDATE workshop_sessions
          SET reserved_places = reserved_places - NEW.participants WHERE id = NEW.session_id;
      END IF;
    END IF;
    RETURN NULL;
  END;
  $$;
  CREATE TRIGGER workshop_registration_capacity
    AFTER INSERT OR UPDATE ON workshop_registrations
    FOR EACH ROW EXECUTE FUNCTION maintain_workshop_reservations();

  INSERT INTO workshop_sessions (title, workshop_id, starts_at, ends_at, capacity, status)
  SELECT slots.title, workshops.id, slots.starts_at, slots.starts_at + interval '90 minutes', 6, 'open'
  FROM workshops
  JOIN (VALUES
    ('cookie-baking-basics', 'Saturday morning', '2026-12-12 10:00+01'::timestamptz),
    ('cookie-baking-basics', 'Saturday morning', '2027-01-16 10:00+01'::timestamptz),
    ('chocolate-cookie-masterclass', 'Saturday afternoon', '2026-12-12 14:00+01'::timestamptz),
    ('chocolate-cookie-masterclass', 'Saturday afternoon', '2027-01-16 14:00+01'::timestamptz),
    ('cookie-decorating-workshop', 'Sunday morning', '2026-12-13 10:00+01'::timestamptz),
    ('cookie-decorating-workshop', 'Sunday morning', '2027-01-17 10:00+01'::timestamptz),
    ('creative-cookie-workshop', 'Sunday afternoon', '2026-12-13 14:00+01'::timestamptz),
    ('creative-cookie-workshop', 'Sunday afternoon', '2027-01-17 14:00+01'::timestamptz)
  ) AS slots(slug, title, starts_at) ON slots.slug = workshops.slug
  WHERE slots.starts_at > now();`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM workshop_registrations) THEN
      RAISE EXCEPTION 'Preserve workshop registration history; roll back application code instead';
    END IF;
  END $$;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "workshop_sessions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "workshop_registrations_id";
  DROP TABLE "workshop_registrations";
  DROP FUNCTION maintain_workshop_reservations();
  DROP TABLE "workshop_sessions";
  DROP TYPE "public"."enum_workshop_sessions_status";
  DROP TYPE "public"."enum_workshop_registrations_status";`)
}
