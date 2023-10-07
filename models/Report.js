import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// one function to get borrows in specific interval
export async function getBorrows(startDate, endDate) {

    const borrowings = await prisma.borrowing.findMany({
        where: {
            checkOutDate: {
              gte: startDate, // Greater than or equal to the start date
              lte: endDate,   // Less than or equal to the end date
            },
        },
    });

    return {
        count: borrowings.length,
        borrowings
    };
}


// get overdue borrows last month
export async function getOverdueBorrows() {

    try {
        const currentDate = new Date().toISOString();
    
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);     // Get the date from one month ago
        const lastMonthDateString = lastMonthDate.toISOString();
    
        
        // Query for books that are overdue
        const borrowings = await prisma.borrowing.findMany({
            where: {
                checkOutDate: {
                    gte: lastMonthDateString,
                    lte: currentDate,
                },
                dueDate: {
                    lt: currentDate,
                },
              status: 'BORROWED',   // Ensure the book is still marked as borrowed
            },
            include: {
              book: true, // Include book details
              borrower: true, // Include borrower details
            },
          });
    
        return {
            count: borrowings.length,
            borrowings
        }
    }
    catch (error) {
        throw error;
    }

}


