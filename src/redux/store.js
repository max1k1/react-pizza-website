import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import pizzasSlice from './slices/pizzasSlice';
import cartSlice from './slices/cartSlice';
export const store = configureStore({
  reducer: { filter: filterSlice, pizzas: pizzasSlice, cart: cartSlice },
});
