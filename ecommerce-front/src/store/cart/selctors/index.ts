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

const itemQuantityAvailabilityCheckingSelector = createSelector(
    (itemQuantity) => itemQuantity,
    (_, itemMax) => itemMax,
    (itemQuantity, itemMax) => {
        const currentItemQuantityInCart = itemQuantity || 0;
        // هنا هجيب الكميه المتبقيه من السله من الريداكس
        const currentRemainingQuantity = itemMax - currentItemQuantityInCart;
        // دا متغير عشان اهندل في الليمت بتاع المنتج اللي ممكن اختاره من السله

        const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
        return { currentRemainingQuantity, quantityReachedToMax };
    }
);
export { getCartTotalQuantitySelector, itemQuantityAvailabilityCheckingSelector };