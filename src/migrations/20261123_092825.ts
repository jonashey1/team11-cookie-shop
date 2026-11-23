import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ADD COLUMN "request_id" varchar;
  CREATE UNIQUE INDEX "orders_request_id_idx" ON "orders" USING btree ("request_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "orders_request_id_idx";
  ALTER TABLE "orders" DROP COLUMN "request_id";`)
}
