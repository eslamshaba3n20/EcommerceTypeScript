import { TProduct } from "@customTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct;

const actGetProductsByCatprefix = createAsyncThunk(
  "products/actGetProductsByCatprefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:3008/products?cat_prefix=${prefix}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.response);
      } else {
        return rejectWithValue("an unknown error occurred");
      }
    }
  }
);

export default actGetProductsByCatprefix;
