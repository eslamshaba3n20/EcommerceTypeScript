import { actGetProductsByItems, cartItemChangeQuantity, removeItemById, cleanCartProdocutsFullInfo } from "@store/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const UseCart = () => {
    const dispatch = useAppDispatch();
    const { items, prodocutsFullInfo, error, loading } = useAppSelector((state) => state.cart);
    const prodcuts = prodocutsFullInfo.map((item) => ({ ...item, quantity: items[item.id] }));
    useEffect(() => {
        const promise = dispatch(actGetProductsByItems());
        return () => {
            // to cancel the request of this page when left it 
            promise.abort();
            dispatch(cleanCartProdocutsFullInfo());
        };

    }, [dispatch]);

    const changeQuantityHandler = useCallback(
        (id: number, quantity: number) => {
            dispatch(cartItemChangeQuantity({ id, quantity }));
        },
        [dispatch]
    );
    const removeItem = useCallback(
        (id: number) => {
            dispatch(removeItemById(id));
        },
        [dispatch]
    );
    return { prodcuts, error, loading, changeQuantityHandler, removeItem };
}

export default UseCart;
