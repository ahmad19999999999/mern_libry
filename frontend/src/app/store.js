import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../slice/books/booksslice.js';
import userReducer from '../slice/users/userslice.js';
import borrowingReducer from '../slice/borrowing/borrowing.js'

export const store = configureStore({
  reducer: {
    books: bookReducer,
    user:userReducer,
    borrowing:borrowingReducer
  
  },
});