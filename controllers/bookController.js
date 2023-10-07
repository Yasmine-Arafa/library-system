import * as Book from '../models/Book.js';

export const createBook = async (req, res) => {
    console.log(req.body);

    try {
        let newBook = await Book.create(req.body);

        if(newBook.id) { // need to be more specific
            return res.status(200).json(newBook);
        }

        return res.status(400).json({ message: "Failed to create the book" });
    }
    catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ message: "Failed to create the book" });
    }
};

export const updateBook = async (req, res) => {

    try {
        const { id } = req.params;
        const updatedBook = await Book.update(id, req.body);

        if (updatedBook.id) {
            return res.status(200).json(updatedBook);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        return res.status(500).json({ message: "Failed to update the book" });
    }

};


export const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.get(id);

        if (book.id) {
            return res.status(200).json(book);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    }
    catch (error) {
        console.error('Error getting book:', error);
        return res.status(500).json({ message: "Failed to get the book" });
    }
};

export const getAll = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        const response = await Book.getAll(page);

        if(response.books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }
        else if (response.books.length <= 15) {
            return res.status(200).json(response);
        }
        else {
            return res.status(400).json({ message: "Failed to get the books" });
        }

    }
    catch (error) {
        console.error('Error getting books:', error);
        return res.status(500).json({ message: "Failed to get the books" });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.deleteBook(id);

        if (deletedBook.id) {
            return res.status(200).json(deletedBook);
        } 
        else {
            return res.status(404).json({ message: "Book not found" });
        }
    }
    catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({ message: "Failed to delete the book" });
    }
};


export const searchBooks = async (req, res) => {
    let value, criteria;
    if(req.query.title) {
        value = req.query.title;
        criteria = 'title';
    }
    else if(req.query.author){
        value = req.query.author;
        criteria = 'author';
    }
    else if(req.query.isbn){
        value = req.query.isbn;
        criteria = 'isbn';
    }
    else{
        return res.status(400).json({ message: "Invalid search" });
    }

    try{
        const books = await Book.searchBooks(criteria, value);
        if(books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }
        return res.status(200).json(books);
    }
    catch (error) {
        console.error('Error searching books:', error);
        return res.status(500).json({ message: "Failed to search the books" });
    }
};