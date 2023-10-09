import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  orderAmount: 0,
  cartItemsCount: 0,
};

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ id, type, size }, { getState, dispatch }) => {
    console.log('THUNKremoveCartItem');
    const state = getState();
    const sameItem = state.cart.cartItems.find(
      (item) => !(item.id !== id && item.size === size && item.type === type),
    );
    if (sameItem) {
      if (sameItem.count <= 1) {
        return dispatch(removeAllCartItem({ id, type, size }));
      } else {
        return dispatch(setCartItemCount(id));
      }
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const sameItem = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );
      if (sameItem) {
        sameItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    setCartItemCount: (state, action) => {
      const sameItem = state.cartItems.find((item) => item.id === action.payload);
      sameItem.count--;
    },
    setOrderAmount: (state) => {
      state.orderAmount = state.cartItems.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    removeAllCartItem: (state, action) => {
      console.log(state.cartItems);
      const choosenPizzaForDelet = state.cartItems.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.type === action.payload.type &&
            item.size === action.payload.size
          ),
      );
      state.cartItems = choosenPizzaForDelet;
      console.log(choosenPizzaForDelet);
    },
    clearItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addCartItem,
  removeAllCartItem,
  setCartItemCount,
  addCartItemCount,
  clearItems,
  setOrderAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
