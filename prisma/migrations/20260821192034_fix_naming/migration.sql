/*
  Warnings:

  - You are about to drop the column `teamId` on the `deals` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `memberships` table. All the data in the column will be lost.
  - Added the required column `team_id` to the `deals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deals" DROP CONSTRAINT "deals_teamId_fkey";

-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_teamId_fkey";

-- AlterTable
ALTER TABLE "deals" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "memberships" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
