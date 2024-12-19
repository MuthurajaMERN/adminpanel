import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slices/adminSlice'
import productSlice from './slices/productSlice'
import testimonialReducer from './slices/testimonialSlice';
import touristCardSlice from './slices/touristCardSlice';

import countryReducer from './slices/countrySlice';
export const store = configureStore({
  reducer: {
    admin:adminSlice,
    product: productSlice,
    testimonial: testimonialReducer,
    cards: touristCardSlice,
    countries:countryReducer,

    
  },
})


