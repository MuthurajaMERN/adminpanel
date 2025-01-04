import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://localhost:8000'; // Adjust according to your server setup

// Thunks for asynchronous API calls
export const fetchAllCountries = createAsyncThunk('countries/fetchAll', async () => {
  const response = await axios.get(`${BASE_URL}/countries`);
  return response.data;
});

export const fetchCountryById = createAsyncThunk('countries/fetchById', async (id) => {
  const response = await axios.get(`${BASE_URL}/countries/${id}`);
  return response.data;
});

export const addNewCountry = createAsyncThunk('countries/addNew', async (country) => {
  const response = await axios.post(`${BASE_URL}/countries`, country);
  return response.data;
});

export const updateCountry = createAsyncThunk('countries/update', async ({ id, updates }) => {
  const response = await axios.put(`${BASE_URL}/countries/${id}`, updates);
  return response.data;
});

export const deleteCountry = createAsyncThunk('countries/delete', async (id) => {
  const response = await axios.delete(`${BASE_URL}/countries/${id}`);
  return response.data;
});

// Slice
const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    countryDetails: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all countries
      .addCase(fetchAllCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch a single country
      .addCase(fetchCountryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countryDetails = action.payload;
      })
      .addCase(fetchCountryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add a new country
      .addCase(addNewCountry.fulfilled, (state, action) => {
        state.countries.push(action.payload);
      })

      // Update a country
      .addCase(updateCountry.fulfilled, (state, action) => {
        const index = state.countries.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.countries[index] = action.payload;
        }
      })

      // Delete a country
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.countries = state.countries.filter((c) => c._id !== action.payload._id);
      });
  },
});

export default countrySlice.reducer;
