/*
  Warnings:

  - Added the required column `test` to the `Borrower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borrower` ADD COLUMN `test` VARCHAR(191) NOT NULL;
