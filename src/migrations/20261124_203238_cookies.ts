import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "cookies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"catalogue_id" numeric NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"flavour" varchar NOT NULL,
  	"price_cents" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cookies_id" integer;
  CREATE UNIQUE INDEX "cookies_catalogue_id_idx" ON "cookies" USING btree ("catalogue_id");
  CREATE UNIQUE INDEX "cookies_slug_idx" ON "cookies" USING btree ("slug");
  CREATE INDEX "cookies_updated_at_idx" ON "cookies" USING btree ("updated_at");
  CREATE INDEX "cookies_created_at_idx" ON "cookies" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cookies_fk" FOREIGN KEY ("cookies_id") REFERENCES "public"."cookies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_cookies_id_idx" ON "payload_locked_documents_rels" USING btree ("cookies_id");`)

  // The six cookies that were written in the code until now (src/content/cookies.ts), with the same
  // numbers, words and prices, so the live site shows the same assortment after this migration and
  // earlier orders still match their cookie. From now on editors change them in /admin.
  await db.execute(sql`
  INSERT INTO "cookies" ("catalogue_id", "name", "slug", "description", "flavour", "price_cents") VALUES
    (1, 'Classic Chocolate Chip', 'classic-chocolate-chip', 'A classic cookie filled with delicious chocolate chips. Perfect for chocolate lovers.', 'Chocolate', 350),
    (2, 'Double Chocolate', 'double-chocolate', 'A rich chocolate cookie with extra chocolate pieces for an intense chocolate experience.', 'Chocolate', 395),
    (3, 'White Chocolate', 'white-chocolate', 'A sweet cookie with creamy white chocolate pieces and a soft centre.', 'White Chocolate', 375),
    (4, 'Red Velvet', 'red-velvet', 'A delicious red velvet cookie with a smooth and sweet flavour.', 'Red Velvet', 395),
    (5, 'Salted Caramel', 'salted-caramel', 'The perfect combination of sweet caramel and a touch of sea salt.', 'Caramel', 395),
    (6, 'Cookies & Cream', 'cookies-and-cream', 'A tasty cookie inspired by the classic combination of cookies and cream.', 'Cookies & Cream', 395)
  ON CONFLICT DO NOTHING;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cookies" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cookies" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cookies_fk";
  
  DROP INDEX "payload_locked_documents_rels_cookies_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cookies_id";`)
}
