import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../app/store'



const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = action.payload.items;
    },
    removeCart: (state, action) => {
      // state.items = state.items.filter((item) => item.id !== action.payload.id)
      state.items = action.payload.items;
    },
  },
});

export const { addToCart, removeCart } = cartSlice.actions;

export const selectItems = (state : RootState) => state.cart.items;

export const totalPrice = (state : RootState) =>
  state.cart.items.reduce((total : any, item : any) => total + item.price, 0);

export default cartSlice.reducer;
