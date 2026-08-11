-- DropIndex
DROP INDEX "contacts_organization_id_idx";

-- DropIndex
DROP INDEX "contacts_organization_id_owner_id_idx";

-- DropIndex
DROP INDEX "deals_organization_id_idx";

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "contacts_organization_id_deleted_at_owner_id_idx" ON "contacts"("organization_id", "deleted_at", "owner_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");
