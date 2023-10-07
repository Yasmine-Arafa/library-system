import express from "express";
import * as bookController from "../controllers/bookController.js"
import * as borrowerController from "../controllers/borrowerController.js"
import * as borrowingController from "../controllers/borrowingController.js"
import * as reportController from "../controllers/reportController.js"

let router = express.Router();


// Book Module
router.post("/book", bookController.createBook);

router.put("/book/:id", bookController.updateBook);

router.get("/book/:id", bookController.getBook);

router.get("/books", bookController.getAll);

router.delete("/book/:id", bookController.deleteBook);

router.get("/books/search", bookController.searchBooks)


// Borrower Module
router.post("/borrower", borrowerController.createBorrower);

router.put("/borrower/:id", borrowerController.updateBorrower);

router.get("/borrower/:id", borrowerController.getBorrower);

router.get("/borrowers", borrowerController.getAll);

router.delete("/borrower/:id", borrowerController.deleteBorrower);


// Borrowing Module
router.post("/borrowing/check-out", borrowingController.checkOutBook);

router.post("/borrowing/return-book", borrowingController.returnBook);

router.get("/borrowing/my-borrowings/:id", borrowingController.checkBorrowings);

router.get("/borrowing/overdue-books", borrowingController.getOverdueBooks);





// Report Module

// show analytical reports of the borrowing process given a specific date range && export to csv
router.post("/report/borrowing-process", reportController.getBorrowingProcess);


// Exports all overdue borrows of the last month
router.get("/report/export-overdue-borrows", reportController.exportOverdueBorrows);

// Exports all borrowing processes of the last month
router.get("/report/export-borrowing-last-month", reportController.getBorrowingProcessLastMonth);



export default router;