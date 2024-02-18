import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


// const initialState = {
//   cart: [],
// };

const productSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      state.push(action.payload);
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { setCart , clearCart } =
  productSlice.actions;

export default productSlice.reducer;

export const selectCart = (state: RootState) => state.cart;
