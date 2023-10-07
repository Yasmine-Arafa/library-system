import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// dealing directly with the database

export async function create(data) {
    const newBook = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        quantity: data.quantity,
        shelfLocation: data.shelfLocation,
      },
    });
    return newBook;
}


export async function get(id) {
  const bookId = parseInt(id);

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    return book;
}

export async function getAll(page) {
  try {
    const pageSize = 15;
    const offset = (page - 1) * pageSize; // Start index
    
    const books = await prisma.book.findMany({
      skip: offset,
      take: pageSize,
    });
    
    return {
      page: page,
      postsCount: books.length,
      books
    }
  } catch (error) {
    throw error;
  }

}

export async function update(id, data) {
    const bookId = parseInt(id);
    const updateData = {};
  
    if (data.title)
      updateData.title = data.title;
    if (data.author)
      updateData.author = data.author;
    if (data.isbn)
      updateData.isbn = data.isbn;
    if (data.quantity)
      updateData.quantity = data.quantity;
    if (data.shelfLocation)
      updateData.shelfLocation = data.shelfLocation;
    
    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: updateData,
    });
    return updatedBook;
}


export async function deleteBook(id) {
    const bookId = parseInt(id);

    const deletedBook = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
    return deletedBook;
}


export async function searchBooks(criteria, value) {
  try{

    const searchResults = await prisma.book.findMany({
      where: {
        [criteria]: {
          contains: value,
        },
      },
    });

    return searchResults;
  }
  catch(error){
    throw error;
  }
}


export async function decrementQuantity(id, count) {
  const bookId = parseInt(id);
  count = parseInt(count);

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (book.quantity >= count) {
    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        quantity: book.quantity - count,
      },
    });
    return updatedBook;
  } else {
    throw new Error('Book quantity cannot be less than 0');
  }
}

export async function incrementQuantity(id, count) {
  const bookId = parseInt(id);
  count = parseInt(count);

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  const updatedBook = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      quantity: book.quantity + count,
    },
  });
  return updatedBook;
}