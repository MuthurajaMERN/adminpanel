import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slices/adminSlice'
import productSlice from './slices/packagesSlice'
import testimonialReducer from './slices/testimonialSlice';
import touristCardReducer from './slices/touristCardSlice';

import countryReducer from './slices/countrySlice';
export const store = configureStore({
  reducer: {
    admin:adminSlice,
    product: productSlice,
    testimonial: testimonialReducer,
    cards: touristCardReducer,
    countries:countryReducer,
    touristCard: touristCardReducer,
    
    
    
  },
})


