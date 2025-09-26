import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch books
export const getbooks = createAsyncThunk(
  'product/getbooks',
  async ({ keyword = '', page = 1}, { rejectWithValue }) => {
    try {
      let query = `http://localhost:3000/api/v1/books?page=${page}`;

      if (keyword) {
        query += `&keyword=${encodeURIComponent(keyword)}`;
      }


      const { data } = await axios.get(query);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(message);
    }
  }
);


export const getbookdetails = createAsyncThunk(
  'product/getbookdetails',
  async (id, { rejectWithValue }) => {
    try {
      const link = `http://localhost:3000/api/v1/book/${id}`;
      const { data } = await axios.get(link, { withCredentials: true }); 
      console.log('response data', data);
      return data; // ترجع البيانات مباشرة
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(message);
    }
  }
);






// Slice
const productSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    bookCount: 0,
    loading: false,
    error: null,
    book:null,
     resultPerPage:3,
     totalPages:0,
     
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
     removesuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getbooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getbooks.fulfilled, (state, action) => {
        console.log('fulfilled action payload', action.payload);
        state.loading = false
        state.error = null
        state.books = action.payload.books
        state.bookCount = action.payload.bookcount
        state.resultPerPage = action.payload.resultPerPage
        state.totalPages = action.payload.totalPages
      })
      .addCase(getbooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
         state.books=[]
      });

      builder.addCase(getbookdetails.pending,(state)=>{
        state.loading = true;
        state.error = null;

      }).addCase(getbookdetails.fulfilled, (state, action) => {
        console.log('fulfilled action payload', action.payload);
        state.loading = false
        state.error = null
        state.book = action.payload.book
        
      })
        .addCase(getbookdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
    
  }
});

export const {removeError,removesuccess} = productSlice.actions; 
export default productSlice.reducer;
