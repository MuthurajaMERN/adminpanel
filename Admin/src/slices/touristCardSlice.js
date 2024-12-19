import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constant";

export const fetchCards = createAsyncThunk(
  "touristCard/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tourist_card/get_all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCardToServer = createAsyncThunk(
  "touristCard/addCardToServer",
  async (cardDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/tourist_card/add`, cardDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCardOnServer = createAsyncThunk(
  "touristCard/updateCardOnServer",
  async ({ id, updatedCard }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/tourist_card/update/${id}`, updatedCard);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCardFromServer = createAsyncThunk(
  "touristCard/deleteCardFromServer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/tourist_card/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const touristCardSlice = createSlice({
  name: "touristCard",
  initialState: {
    cards: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload.data;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addCardToServer.fulfilled, (state, action) => {
        state.cards.push(action.payload.data);
      })
      .addCase(updateCardOnServer.fulfilled, (state, action) => {
        const index = state.cards.findIndex((card) => card._id === action.payload.data._id);
        if (index !== -1) {
          state.cards[index] = action.payload.data;
        }
      })
      .addCase(deleteCardFromServer.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card._id !== action.payload.data._id);
      });
  },
});

export default touristCardSlice.reducer;
