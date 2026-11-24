import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cookies_illustration" AS ENUM('classic-chocolate-chip', 'double-chocolate', 'salted-caramel', 'red-velvet', 'cookies-and-cream', 'white-chocolate');
  CREATE TABLE "cookies" (
    "id" serial PRIMARY KEY NOT NULL,
    "product_id" numeric NOT NULL,
    "name" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "description" varchar NOT NULL,
    "flavour" varchar NOT NULL,
    "price" numeric NOT NULL,
    "illustration" "enum_cookies_illustration" NOT NULL,
    "sweetness" numeric NOT NULL,
    "chocolate" numeric NOT NULL,
    "texture" varchar NOT NULL,
    "preference" varchar NOT NULL,
    "caramel" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cookies_id" integer;
  CREATE UNIQUE INDEX "cookies_product_id_idx" ON "cookies" USING btree ("product_id");
  CREATE UNIQUE INDEX "cookies_slug_idx" ON "cookies" USING btree ("slug");
  CREATE INDEX "cookies_updated_at_idx" ON "cookies" USING btree ("updated_at");
  CREATE INDEX "cookies_created_at_idx" ON "cookies" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cookies_fk" FOREIGN KEY ("cookies_id") REFERENCES "public"."cookies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_cookies_id_idx" ON "payload_locked_documents_rels" USING btree ("cookies_id");
  INSERT INTO "cookies" ("product_id","name","slug","description","flavour","price","illustration","sweetness","chocolate","texture","preference","caramel") VALUES
    (1, 'Classic Chocolate Chip', 'classic-chocolate-chip', 'A classic cookie filled with delicious chocolate chips. Perfect for chocolate lovers.', 'Chocolate', 350, 'classic-chocolate-chip', 3, 3, 'Soft and chewy', 'Classic chocolate chip flavours', false),
    (2, 'Double Chocolate', 'double-chocolate', 'A rich chocolate cookie with extra chocolate pieces for an intense chocolate experience.', 'Chocolate', 395, 'double-chocolate', 4, 5, 'Rich and soft', 'Deep cocoa flavours', false),
    (3, 'White Chocolate', 'white-chocolate', 'A sweet cookie with creamy white chocolate pieces and a soft centre.', 'White Chocolate', 375, 'white-chocolate', 5, 2, 'Soft and creamy', 'Creamy white chocolate', false),
    (4, 'Red Velvet', 'red-velvet', 'A delicious red velvet cookie with a smooth and sweet flavour.', 'Red Velvet', 395, 'red-velvet', 4, 2, 'Soft and tender', 'Mild cocoa and red velvet flavours', false),
    (5, 'Salted Caramel', 'salted-caramel', 'The perfect combination of sweet caramel and a touch of sea salt.', 'Caramel', 395, 'salted-caramel', 4, 1, 'Soft and chewy', 'Sweet and salty caramel', true),
    (6, 'Cookies & Cream', 'cookies-and-cream', 'A tasty cookie inspired by the classic combination of cookies and cream.', 'Cookies & Cream', 395, 'cookies-and-cream', 5, 3, 'Soft with crunchy pieces', 'Cookies-and-cream flavours', false)
  ON CONFLICT ("product_id") DO NOTHING;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cookies_id";
  DROP TABLE "cookies";
  DROP TYPE "public"."enum_cookies_illustration";`)
}
