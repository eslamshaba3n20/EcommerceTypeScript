import { Headding } from "@components/common";
import { CartItemList, CartSubTotalPrice } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import UseCart from "@hooks/useCart";


const Cart = () => {
    const { prodcuts, loading, error, removeItem, changeQuantityHandler } = UseCart();


    return (
        <>
            <Headding title="Your Cart" />

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
