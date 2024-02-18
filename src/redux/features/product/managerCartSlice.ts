import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


// const initialState = {
//   cart: [],
// };

const mCartSlice = createSlice({
  name: "mCart",
  initialState: [],
  reducers: {
    setmCart: (state, action) => {
      state.push(action.payload);
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { setmCart , clearCart } =
  mCartSlice.actions;

export default mCartSlice.reducer;

export const selectManagerCart = (state: RootState) => state.mCart;
