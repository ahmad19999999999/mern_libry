import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// borrow book
export const borrowBook = createAsyncThunk(
  "books/borrowBook",
  async ({bookId}, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/v1/borrow/book/${bookId}`, {} ,{ withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Borrow failed"
      );
    }
  }
);

// return book
export const returnBook = createAsyncThunk(
  "books/returnBook",
  async ({bookId}, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/v1/return/book/${bookId}`, {} ,{ withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Return failed"
      );
    }
  }
);



const borrowingslice = createSlice({
  name: "borrowing",
  initialState: {
    items:[],
    loading: false,
    error: null,
    success: false,
   
  },
  reducers: {
    removeSuccess: (state) => { state.success = false; },
    removeError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // borrow
      .addCase(borrowBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.push(action.payload);

        
        
       
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // return
      .addCase(returnBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
         state.items = state.items.filter(item => item._id !== action.payload._id);

      
        
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

     
  },
});

export const { removeSuccess, removeError } = borrowingslice.actions;
export default borrowingslice.reducer;
