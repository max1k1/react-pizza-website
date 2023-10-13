import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading', // loading || success || error
};

export const requestPizzas = createAsyncThunk(
  'pizzas/requestPizzas',
  async ({ category, sortBy, order, search, currentPage }, thunkAPI) => {
    const { data } = await axios.get(
      `https://65195bba818c4e98ac604bdc.mockapi.io/items?page=${currentPage}&limit=6${category}${sortBy}${order}${search}`,
    );
    return data;
  },
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPizzas.pending, (state) => {
        // console.log(action, 'loading');
        state.status = 'loading';
        state.items = [];
      })
      .addCase(requestPizzas.fulfilled, (state, action) => {
        // console.log(action, 'success');
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(requestPizzas.rejected, (state, action) => {
        // console.log(action, 'error');
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzasData = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
