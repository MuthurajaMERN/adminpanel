// Redux Toolkit Slice for Tourist Packages
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API
const BASE_URL = "http://localhost:8000"; // Change this according to your backend setup

// Async Thunks for API calls
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/packages`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching packages");
    }
  }
);

export const addPackage = createAsyncThunk(
  "packages/addPackage",
  async (packageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/packages`, packageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding package");
    }
  }
);

export const updatePackage = createAsyncThunk(
  "packages/updatePackage",
  async ({ id, packageData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/packages/${id}`,
        packageData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating package");
    }
  }
);

export const deletePackage = createAsyncThunk(
  "packages/deletePackage",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/packages/${id}`);
      return id; // Return the deleted package's ID
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting package");
    }
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    packages: [
      {
        _id: "1",
        image: "",
        title: "Taj Mahal Tour",
        subtitle: "Experience the Wonder",
        category: "Heritage",
        subCategory: "India",
        stars: 5,
        price: 10000,
        discount: 10,
        county: "India",
        place: "Agra",
        content:
          "Visit the majestic Taj Mahal with guided tours and cultural insights.",
        transport: "Bus",
      },
      {
        _id: "2",
        image: "",
        title: "Goa Beach Escape",
        subtitle: "Relax and Unwind",
        category: "Beach",
        subCategory: "India",
        stars: 4,
        price: 15000,
        discount: 15,
        county: "India",
        place: "Goa",
        content: "Enjoy pristine beaches, water sports, and vibrant nightlife.",
        transport: "Flight",
      },
      // Add 8 more sample packages for visa-free and Indian destinations
    ],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addPackage.fulfilled, (state, action) => {
        state.packages.push(action.payload);
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        const index = state.packages.findIndex(
          (pkg) => pkg._id === action.payload._id
        );
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packages = state.packages.filter(
          (pkg) => pkg._id !== action.payload
        );
      });
  },
});

export default packagesSlice.reducer;
