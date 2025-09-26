import Book from "../models/Booksmodel.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import HandelAsyncError from "../midelware/HandelAsyncError.js";
import apiFunctionality from "../utils/apiFunctionality.js";
import cloudinary from "../utils/CloudinaryConfig.js";


// =================== CREATE BOOK ===================
export const createBook = HandelAsyncError(async (req, res, next) => {

 
  if (!req.body.title || !req.body.author || !req.body.isbn) {
    return next(new ErrorHandler(400, "Title, author, and ISBN are required"));
  }

  const existingBook = await Book.findOne({ isbn: req.body.isbn });
  if (existingBook) {
    return next(new ErrorHandler(400, "Book with this ISBN already exists"));
  }

 
  let images = [];
  if (req.body.images && req.body.images.length > 0) {
    for (let img of req.body.images) {
      const result = await cloudinary.uploader.upload(img, { folder: 'books' });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }
  req.body.images = images;

 
  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    book,
  });
});

// =================== GET ALL BOOKS ===================
export const getAllBooks = HandelAsyncError(async (req, res, next) => {
  const resultPerPage = 2;

  const apiFeatures = new apiFunctionality(Book.find(), req.query)
    .search()
    

  const filterQuery = apiFeatures.query.clone();
  const bookcount = await filterQuery.countDocuments();

  const totalPages = Math.ceil(bookcount / resultPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && bookcount > 0) {
    return next(new ErrorHandler(400, "This page not found"));
  }

  apiFeatures.pagination(resultPerPage);
  const books = await apiFeatures.query;

  if (!books || books.length === 0) {
    return next(new ErrorHandler(400, "No books found"));
  }

  res.status(200).json({
    success: true,
    books,
    bookcount,
    totalPages,
    resultPerPage,
    currentPage: page,
  });
});

// =================== GET BOOK BY ID ===================
export const getBookById = HandelAsyncError(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler(404, "Book not found"));
  }

  res.status(200).json({
    success: true,
    book,
  });
});


