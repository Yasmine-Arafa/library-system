-- DropForeignKey
ALTER TABLE `borrowing` DROP FOREIGN KEY `Borrowing_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `borrowing` DROP FOREIGN KEY `Borrowing_borrowerId_fkey`;

-- AddForeignKey
ALTER TABLE `Borrowing` ADD CONSTRAINT `Borrowing_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrowing` ADD CONSTRAINT `Borrowing_borrowerId_fkey` FOREIGN KEY (`borrowerId`) REFERENCES `Borrower`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
