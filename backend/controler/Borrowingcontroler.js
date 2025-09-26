// controllers/BorrowingController.js
import Borrowing from "../models/Borrowingmodel.js";
import Book from "../models/Booksmodel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import HandelAsyncError from "../midelware/HandelAsyncError.js";

// BORROW BOOK 
export const borrowBook = HandelAsyncError(async (req, res, next) => {
  const bookId = req.params.id;
  const currentUserId = req.user._id; 

  const book = await Book.findById(bookId);
  if (!book) return next(new ErrorHandler(404, "Book not found"));
  if (!book.isAvailable) return next(new ErrorHandler(400, "Book is not available"));

  
  await Borrowing.create({ userId: currentUserId, bookId });

 
  book.isAvailable = false;
  book.borrowingBy = currentUserId;
  await book.save();

  res.status(200).json(book); 
});

//  RETURN BOOK 
export const returnBook = HandelAsyncError(async (req, res, next) => {
  const bookId = req.params.id;
  const currentUserId = req.user._id;

 
  const borrowing = await Borrowing.findOne({
    userId: currentUserId,
    bookId,
    returnDate: null,
  });
  if (!borrowing) 
    return next(new ErrorHandler(400, "You cannot return this book or it is already returned"));

 
  borrowing.returnDate = new Date();
  await borrowing.save();

  const book = await Book.findById(bookId);
  if (!book) return next(new ErrorHandler(404, "Book not found"));

  if (book.borrowingBy?.toString() !== currentUserId.toString()) {
    return next(new ErrorHandler(400, "You cannot return a book borrowed by another user"));
  }

  book.isAvailable = true;
  book.borrowingBy = null;
  await book.save();

  res.status(200).json(book);
});





