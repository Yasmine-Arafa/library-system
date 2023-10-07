import * as borrowing from '../models/Borrowing.js';
import * as book from '../models/Book.js';
import * as borrower from '../models/Borrower.js';

export const checkOutBook = async (req, res) => {

  try {
    let { bookId, borrowerId } = req.body;
    bookId = parseInt(bookId);
    borrowerId = parseInt(borrowerId);

    const borrowerData = await borrower.get(borrowerId);
    let booksCount = borrowerData.booksCount;

    // if borrowe has 5 books, return not allowed
    if (booksCount >= 5) {
      return res.status(400).json({ message: "Borrower has reached the maximum number of books allowed" });
    }


    // check book quantity
    const bookData = await book.get(bookId);
    let bookQuantity = bookData.quantity;

    if (bookQuantity <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }

    // not allowed to borrow the same book twice [fetch my Borrowings & find same bookId with 'Borrowed' status ]
    const borrowingRecords = await borrowing.checkBorrowings(borrowerId);

    for (const borrowingRecord of borrowingRecords) {
      if (borrowingRecord.bookId === bookId) {
        return res.status(400).json({ message: "Borrower has already borrowed this book" });
      }
    }

    // create borrowing record
    const newBorrowing = await borrowing.create(borrowerId, bookId);

    if (newBorrowing.id) {
      
      // decrement book quantity
      const updatedBook = await book.decrementQuantity(bookId, 1);
      // increment borrower booksCount
      const updatedBorrower = await borrower.incrementBooksCount(borrowerId, 1);

      if (updatedBook.id && updatedBorrower.id)
        return res.status(200).json(newBorrowing);

      else
        return res.status(400).json({ message: "Failed in updating book and borrower records" });

    }
    else {
      return res.status(400).json({ message: "Failed creating new borrowing" });
    }

  }
  catch (error) {
    console.error('Error checkout:', error);
    return res.status(500).json({ message: "Failed to checkout" });
  }

};

export const returnBook = async (req, res) => {

  try {
    const { bookId, borrowerId } = req.body;

    // update borrowing record
    const updatedBorrowing = await borrowing.updateStatus(borrowerId, bookId);

    if (updatedBorrowing.count > 0) {

      // increment book quantity
      const updatedBook = await book.incrementQuantity(bookId, 1);
  
      // decrement borrower booksCount
      const updatedBorrower = await borrower.decrementBooksCount(borrowerId, 1);

      if (updatedBook.id && updatedBorrower.id)
        return res.status(200).json("Book returned successfully");

      else
        return res.status(400).json({ message: "Failed in updating book and borrower records" });

    }
    else if (updatedBorrowing.count === 0) {
      return res.status(400).json({ message: "Borrowing record not found" });
    }
    else {
      return res.status(400).json({ message: "Failed updating borrowing record" });
    }

  }
  catch (error) {
    console.error('Error returning book:', error);
    return res.status(500).json({ message: "Failed to return book" });
  }
  

};

export const checkBorrowings = async (req, res) => {
  
  try {
    const { id } = req.params;
    const borrowingRecords = await borrowing.checkBorrowings(id);

    if(borrowingRecords.count > 0)
      return res.status(200).json(borrowingRecords);
    else
      return res.status(400).json({ message: "No borrowing records found" })

  }
  catch (error) {
    console.error('Error checking borrowings:', error);
    return res.status(500).json({ message: "Failed to check borrowings" });
  }

};

export const getOverdueBooks = async (req, res) => {

  try {
    const overdueBooks = await borrowing.getOverdueBooks();

    if(overdueBooks.count > 0)
      return res.status(200).json(overdueBooks);
    else
      return res.status(400).json({ message: "No overdue books found" })

  }
  catch (error) {
    console.error('Error getting overdue books:', error);
    return res.status(500).json({ message: "Failed to get overdue books" });
  }

};
