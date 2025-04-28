import { TProduct } from "@customTypes/products";
import { createSlice } from "@reduxjs/toolkit";

interface ICartState {
    items: { [key: number]: number };
    prodocutFullInfo: TProduct[];
}

const initialState: ICartState = {
    items: {},
    prodocutFullInfo: [],
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
    },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
