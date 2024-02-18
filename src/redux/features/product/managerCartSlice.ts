import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TGadget } from "../../../types/types";


const mCartSlice = createSlice({
  name: "mCart",
  initialState: []  as TGadget[],
  reducers: {
    setmCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
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

export const { setmCart ,removeFromCart, clearCart } =
  mCartSlice.actions;

export default mCartSlice.reducer;

export const selectManagerCart = (state: RootState) => state.mCart;
