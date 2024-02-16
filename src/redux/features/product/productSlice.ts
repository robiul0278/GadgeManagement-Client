import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TGadget } from "../../../types/types";

// interface ProductState {
//   key: string;
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   brand: string;
//   model_number: string;
//   category: string;
//   operating_system: string;
//   connectivity: string;
//   power_source: string;
//   features: string;
//   isDeleted?: boolean;
//   release_date: string;
// }

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
    // removeFromCart: (state, action) => {
    //   state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    // },
    // clearCart: (state) => {
    //   state.cart = [];
    // },
  },
});

export const { setCart /* removeFromCart, clearCart  */ } =
  productSlice.actions;

export default productSlice.reducer;

export const selectCart = (state: RootState) => state.cart;
