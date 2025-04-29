import { TProduct } from "@customTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

type Tresponse = TProduct[];
const actGetProductsByItems = createAsyncThunk(
    "cart/actGetProductsByItems",
    async (_NEVER, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
        const { cart } = getState() as RootState;
        const ItemsId = Object.keys(cart.items);

        // هنا عشان لو مفيش حاجه في الكارت ميرجعش الداتا
        if (!ItemsId.length) {
            // دي بستخدمها عشات يرجع مصفوفه فاضيه عشان لازم ترجع مصفوفه في صفحه السلايز
            return fulfillWithValue([]);
        }

        try {
            const itemIdConcated = ItemsId.map((itemId) => `id=${itemId}`).join("&");

            const response = await axios.get<Tresponse>(
                `/products?${itemIdConcated}`
            );
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);
            } else {
                return rejectWithValue("An unexpected error");
            }
        }

    }

)


export default actGetProductsByItems;