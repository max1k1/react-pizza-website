import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  orderAmount: 0,
  cartItemsCount: 0,
};

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  ({ id, type, size }, { getState, dispatch }) => {
    const { cart } = getState();
    const sameItem = cart.cartItems.find(
      (item) => item.id === id && item.size === size && item.type === type,
    );
    if (sameItem) {
      if (sameItem.count <= 1) {
        return dispatch(removeAllCartItem({ id, type, size }));
      } else {
        return dispatch(setCartItemCount({ id, type, size }));
      }
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const sameItemsId = state.cartItems.find((item) => item.id === action.payload.id); // items which have the same id, but not the same parametrs will be counted on home page like the same pizzas count
      const sameItem = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );
      if (sameItemsId) {
        sameItemsId.sameItemsIdCount++;
      }
      if (sameItem) {
        sameItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
          sameItemsIdCount: 1,
        });
      }
    },
    setOrderInfo: (state) => {
      state.orderAmount = state.cartItems.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
      state.cartItemsCount = state.cartItems.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    },
    setCartItemCount: (state, action) => {
      const { id, size, type } = action.payload;
      const sameItem = state.cartItems.find(
        (item) => item.id === id && item.type === type && item.size === size,
      );
      if (sameItem) sameItem.count--;
    },
    removeAllCartItem: (state, action) => {
      const { id, size, type } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.type === type && item.size === size),
      );
    },
    clearItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
  state.cart.cartItems.find((item) => item.id === id);

export const { addCartItem, removeAllCartItem, setCartItemCount, clearItems, setOrderInfo } =
  cartSlice.actions;

export default cartSlice.reducer;
