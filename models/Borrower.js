import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// dealing directly with the database

/**
    name String
    phone String
    email String 
    regDate DateTime
 */

export async function create(data) {
    const regDate = new Date().toISOString();  //  Outputs:  2023-10-06T19:38:24.005Z

    const newBorrower = await prisma.borrower.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        regDate: regDate,
      },
    });
    return newBorrower;
}


export async function get(id) {
  const borrowerId = parseInt(id);

    const borrower = await prisma.borrower.findUnique({
      where: {
        id: borrowerId,
      },
    });
    return borrower;
}

export async function getAll(page) {
  try {
    const pageSize = 15;
    const offset = (page - 1) * pageSize; // Start index
    
    const borrowers = await prisma.borrower.findMany({
      skip: offset,
      take: pageSize,
    });
    
    return {
      page: page,
      postsCount: borrowers.length,
      borrowers
    }
  } catch (error) {
    throw error;
  }

}

export async function update(id, data) {
    const borrowerId = parseInt(id);
    const updateData = {};
  
    if (data.name)
        updateData.name = data.name;
    if (data.phone)
        updateData.phone = data.phone;
    if (data.email)
        updateData.email = data.email;
    if(data.booksCount)
        updateData.booksCount = data.booksCount;
    
    const updatedBorrower = await prisma.borrower.update({
      where: {
        id: borrowerId,
      },
      data: updateData,
    });
    return updatedBorrower;
}


export async function deleteBorrower(id) {
    const borrowerId = parseInt(id);

    const deletedBorrower = await prisma.borrower.delete({
      where: {
        id: borrowerId,
      },
    });
    return deletedBorrower;
}


export async function decrementBooksCount(id, count) {

  const borrowerId = parseInt(id);
  count = parseInt(count);

  const borrower = await prisma.borrower.findUnique({
    where: {
      id: borrowerId,
    },
  });

  if (borrower.booksCount > count) {
    const updatedBorrow = await prisma.borrower.update({
      where: {
        id: borrowerId,
      },
      data: {
        booksCount: borrower.booksCount - count,
      },
    });
    return updatedBorrow;
  } else {
    throw new Error('Borrowe books count cannot be less than 0');
  }

}

export async function incrementBooksCount(id, count) {
    const borrowerId = parseInt(id);
    count = parseInt(count);
  
    const borrower = await prisma.borrower.findUnique({
      where: {
        id: borrowerId,
      },
    });
  
    const updatedBorrow = await prisma.borrower.update({
      where: {
        id: borrowerId,
      },
      data: {
        booksCount: borrower.booksCount + count,
      },
    });
    return updatedBorrow;
  
  }
