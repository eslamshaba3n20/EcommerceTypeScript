import { TProduct } from "@customTypes/products";
import CartItem from "../cartItem/CartItem";

type CartItemListProps = {
    products: TProduct[];
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
};
const CartItemList = ({ products, changeQuantityHandler, removeItem }: CartItemListProps) => {
    const renderListItems = products.map((product) => (
        <CartItem
            changeQuantityHandler={changeQuantityHandler}
            removeItem={removeItem}
            key={product.id}
            {...product}
        />
    ));
    return <div>{renderListItems}</div>;
};

export default CartItemList;
