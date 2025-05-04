import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatprefix from "./act/actGetProductsByCatprefix";
import { TProduct, TLoading, isString } from "@types";

// type of verable on initialState
interface ICategoriesState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanProductsRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatprefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatprefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      // state.records = action.payload;
      if (Array.isArray(action.payload)) {
        state.records = action.payload;
      } else {
        state.error = "Invalid data received";
      }
    });
    builder.addCase(actGetProductsByCatprefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { cleanProductsRecords } = productsSlice.actions;

export { actGetProductsByCatprefix };
export default productsSlice.reducer;
