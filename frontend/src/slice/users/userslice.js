import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// REGISTER
export const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const isFormData = userData instanceof FormData;

      const config = {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
          withCredentials: true
        },
      
      };

      const { data } = await axios.post(
        'http://localhost:3000/api/v1/register',
        userData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Registration failed. Please try again later.',
        statusCode: error.response?.status,
      });
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    
      };

      const { data } = await axios.post(
        'http://localhost:3000/api/v1/login',
        userData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Login failed. Please check your credentials.',
        statusCode: error.response?.status,
      });
    }
  }
);



// LOGOUT
export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/logout', {}, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to logout user.',
        statusCode: error.response?.status,
      });
    }
  }
);




// USER SLICE
const userslice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    success: false,
  },
  reducers: {
    removeError: (state) => { state.error = null; },
    removeAccess: (state) => { state.success = false; },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success || false;
        state.error = null;
        state.isAuthenticated = Boolean(action.payload?.user);

       
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed.';
        state.isAuthenticated = false;
        state.user = null;
        state.success = false;
      })

      // LOGIN
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success || false;
        state.error = null;
        state.isAuthenticated = Boolean(action.payload?.user);

      
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed.';
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
      })

    

      // LOGOUT
      .addCase(logout.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
        state.success = false;

        
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to logout.';
      })

 
  },
});

export const { removeAccess, removeError } = userslice.actions;
export default userslice.reducer;
