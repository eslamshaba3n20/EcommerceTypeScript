import { TProduct } from "@customTypes/products";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector, itemQuantityAvailabilityCheckingSelector } from "./selctors";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TLoading } from "@customTypes/shared";

interface ICartState {
    items: { [key: string]: number };
    prodocutsFullInfo: TProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICartState = {
    items: {},
    prodocutsFullInfo: [],
    loading: "idle",
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id]++;
            } else {
                state.items[id] = 1;
            }
        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity;
        },
        removeItemById: (state, action) => {
            const id = action.payload;
            delete state.items[id];
            state.prodocutsFullInfo = state.prodocutsFullInfo.filter((item) => item.id !== id);

        },

    },
    extraReducers(builder) {
        builder.addCase(actGetProductsByItems.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.prodocutsFullInfo = action.payload;
            state.error = null;
        });
        builder.addCase(actGetProductsByItems.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });

    },
});
export const { addToCart, cartItemChangeQuantity, removeItemById } = cartSlice.actions;
export {
    getCartTotalQuantitySelector
    , actGetProductsByItems,
    itemQuantityAvailabilityCheckingSelector
};
export default cartSlice.reducer;
