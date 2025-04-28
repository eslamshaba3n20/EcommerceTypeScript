import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";


// createSelector is like as usememo and use Callback in react to memoize the value and avoid re-rendering the component 
const getCartTotalQuantitySelector = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        // عشان احسب العدد الكلي للمنتجات في السلة
        const totalQuantity = Object.values(items).reduce((acaccumulator, currentValue) => acaccumulator + currentValue, 0);
        return totalQuantity;
    }
);
export { getCartTotalQuantitySelector };