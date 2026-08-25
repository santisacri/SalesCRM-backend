/*
  Warnings:

  - A unique constraint covering the columns `[admin_id,organization_id]` on the table `teams` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "teams_admin_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "teams_admin_id_organization_id_key" ON "teams"("admin_id", "organization_id");
