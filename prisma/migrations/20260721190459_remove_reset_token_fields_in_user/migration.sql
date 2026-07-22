/*
  Warnings:

  - You are about to drop the column `password_reset_expires` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_token` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_password_reset_token_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_reset_expires",
DROP COLUMN "password_reset_token";
