import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TGadget } from "../../../types/types";



const productSlice = createSlice({
  name: "cart",
  initialState: []  as TGadget[],
  reducers: {
    setCart: (state, action) => {
      state.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      const indexToRemove = state.findIndex(item => item._id === action.payload.id);
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
      }
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { setCart , clearCart, removeItemFromCart } =
  productSlice.actions;

export default productSlice.reducer;

export const selectCart = (state: RootState) => state.cart;
