import { Headding } from "@components/common";
import { CartItemList, CartSubTotalPrice } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import { actGetProductsByItems, cartItemChangeQuantity, removeItemById } from "@store/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const Cart = () => {
    const dispatch = useAppDispatch();
    const { items, prodocutsFullInfo, error, loading } = useAppSelector((state) => state.cart);
    const prodcuts = prodocutsFullInfo.map((item) => ({ ...item, quantity: items[item.id] }));
    useEffect(() => {
        dispatch(actGetProductsByItems());
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

    return (
        <>
            <Headding>Cart</Headding>
            <Loading stuts={loading} error={error} >
                <>
                    {prodcuts.length ?
                        <>
                            <CartItemList
                                removeItem={removeItem}
                                products={prodcuts} changeQuantityHandler={changeQuantityHandler} />
                            <CartSubTotalPrice prodcuts={prodcuts} />
                        </>
                        : "your cart is empty"}
                </>
            </Loading>

        </>
    );
}

export default Cart;
