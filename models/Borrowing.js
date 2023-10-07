import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * 
    borrowerId Int
    bookId Int
    checkOutDate DateTime @default(now())
    dueDate DateTime
    status BorrowingStatus
 */


export async function create(borrowerId, bookId) {  // create a borrowing
    borrowerId = parseInt(borrowerId);
    bookId = parseInt(bookId);

    const currentDate = new Date();
    const checkOutDate = currentDate.toISOString();

    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + 14);

    console.log(dueDate);

    const newBorrowing = await prisma.borrowing.create({
      data: {
        borrowerId: borrowerId,
        bookId: bookId,
        checkOutDate: checkOutDate,
        dueDate: dueDate,
        status: 'BORROWED',
      },
    });
    return newBorrowing;
}



export async function updateStatus(borrowerId, bookId) {
    borrowerId = parseInt(borrowerId);
    bookId = parseInt(bookId);

    try{
        const updatedBorrowing = await prisma.borrowing.updateMany({
            where: {
                AND: {
                    borrowerId: borrowerId,
                    bookId: bookId,
                    status: 'BORROWED'
                }
            },
            data: {
                status: 'RETURNED',
            },
        });

        return updatedBorrowing;
    }
    catch(error){
        throw error;
    }
}



export async function checkBorrowings(borrowerId) {
    borrowerId = parseInt(borrowerId);

    const borrowings = await prisma.borrowing.findMany({
      where: {
        borrowerId: borrowerId,
        status: 'BORROWED',
      },
    });
    console.log('borrowings: ', borrowings);
    return {
        count: borrowings.length,
        borrowings
    };
}


export async function getOverdueBooks() {

    try {
        const currentDate = new Date().toISOString();
        
        // Query for books that are overdue
        const overdueBooks = await prisma.borrowing.findMany({
            where: {
              dueDate: {
                lt: currentDate,
              },
              status: 'BORROWED', // Ensure the book is still marked as borrowed
            },
            include: {
              book: true, // Include book details
              borrower: true, // Include borrower details
            },
          });
    
        return {
            count: overdueBooks.length,
            overdueBooks
        }
      }
      catch (error) {
        throw error;
      }

}