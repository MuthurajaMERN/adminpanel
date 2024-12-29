import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your backend URL

// Async Thunks
export const fetchTouristCards = createAsyncThunk('touristCard/fetchAll', async () => {
  const response = await axios.get(`${API_BASE_URL}/get-cards`);

  console.log("fetchTouristCards")
  return response.data;
});

export const fetchTouristCardById = createAsyncThunk('touristCard/fetchById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/get-cards/${id}`);

  console.log("fetchTouristCardsById")

  return response.data;
});

export const createTouristCard = createAsyncThunk('touristCard/create', async (card) => {
  const response = await axios.post(`${API_BASE_URL}/add-card`, card);

  console.log("craeteTouristCards")

  return response.data;
});

export const updateTouristCard = createAsyncThunk('touristCard/update', async ({ id, updatedData }) => {
  const response = await axios.put(`${API_BASE_URL}/put-cards/${id}`, updatedData);
  console.log("updateTouristCards")

  return response.data;
});

export const deleteTouristCard = createAsyncThunk('touristCard/delete', async (id) => {
  await axios.delete(`${API_BASE_URL}/delete-cards/${id}`);
  return id; // Return the deleted ID to update the state
});

// Slice
const touristCardSlice = createSlice({
  name: 'touristCard',
  initialState: {
    cards: [],
    card: null,
    loading: false,
    error: null,
  },
  reducers: {}, // No additional reducers needed
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchTouristCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTouristCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchTouristCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch By ID
      .addCase(fetchTouristCardById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTouristCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.card = action.payload;
      })
      .addCase(fetchTouristCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createTouristCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      // Update
      .addCase(updateTouristCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((card) => card.id === action.payload.id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteTouristCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card.id !== action.payload);
      });
  },
});

export default touristCardSlice.reducer;
