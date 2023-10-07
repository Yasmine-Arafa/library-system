/*
  Warnings:

  - You are about to drop the column `borrowDate` on the `borrowing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `borrowing` DROP COLUMN `borrowDate`,
    ADD COLUMN `checkOutDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
