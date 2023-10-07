/*
  Warnings:

  - You are about to drop the column `borrowingCount` on the `borrower` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `borrower` DROP COLUMN `borrowingCount`,
    ADD COLUMN `booksCount` INTEGER NOT NULL DEFAULT 0;
