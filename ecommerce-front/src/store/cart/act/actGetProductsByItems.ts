import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

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
            return rejectWithValue(axiosErrorHandler(error));
        }

    }

)


export default actGetProductsByItems;