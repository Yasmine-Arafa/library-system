/*
  Warnings:

  - You are about to drop the column `test` on the `borrower` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `test` VARCHAR(191) NOT NULL DEFAULT 'test';

-- AlterTable
ALTER TABLE `borrower` DROP COLUMN `test`;
