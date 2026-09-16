-- DropIndex
DROP INDEX "teams_admin_id_organization_id_key";

-- CreateIndex
CREATE INDEX "teams_admin_id_organization_id_idx" ON "teams"("admin_id", "organization_id");

-- CreateUniqueIndex (partial)
CREATE UNIQUE INDEX "teams_admin_id_organization_id_unique"
ON "teams" ("admin_id", "organization_id")
WHERE "deleted_at" IS NULL;
