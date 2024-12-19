import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../constant"; // Ensure this points to your environment configuration file

// Async Thunks
export const fetchCountries = createAsyncThunk('countries/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/countries`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createCountry = createAsyncThunk('countries/create', async (countryData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/countries`, countryData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateCountry = createAsyncThunk('countries/update', async ({ id, countryData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/countries/${id}`, countryData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteCountry = createAsyncThunk('countries/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/countries/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Slice
const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create
      .addCase(createCountry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries.push(action.payload.data);
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.countries.findIndex((c) => c._id === action.payload.data._id);
        if (index !== -1) {
          state.countries[index] = action.payload.data;
        }
      })
      // Delete
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = state.countries.filter((c) => c._id !== action.payload.data._id);
      });
  },
});

export default countrySlice.reducer;
