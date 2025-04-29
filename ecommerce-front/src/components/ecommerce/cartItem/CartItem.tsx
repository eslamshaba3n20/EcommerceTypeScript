import { memo } from "react";
import { Form, Button } from "react-bootstrap";
import { TProduct } from "@customTypes/products";
// import { TProduct } from "@customTypes/products";
import styles from "./style.module.css";

type CartItemProps = TProduct & {
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
};
const { cartItem, product, productImg, productInfo, cartItemSelection, } =
    styles;

const CartItem = memo(
    ({
        title,
        img,
        price,
        max,
        quantity,
        id,
        changeQuantityHandler,
        removeItem
    }: CartItemProps) => {
        const renderOpations = Array(max)
            .fill(0)
            .map((_, index) => {
                const Quantity = index + 1;

                return (
                    <option key={index} value={Quantity}>
                        {Quantity}
                    </option>
                );
            });

        const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const quantity = +event.target.value;
            changeQuantityHandler(id, quantity);
        };
        return (
            <div className={cartItem}>
                <div className={product}>
                    <div className={productImg}>
                        <img src={img} />
                    </div>
                    <div className={productInfo}>
                        <h2>{title}</h2>
                        <h3>{price.toFixed(2)} EGP</h3>
                        <Button
                            variant="secondary"
                            style={{ color: "white", width: "100px" }}
                            className="mt-auto"
                            onClick={() => {
                                removeItem(id);
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                </div>

                <div className={cartItemSelection}>
                    <span className="d-block mb-1">Quantity</span>
                    <Form.Select value={quantity} onChange={changeQuantity}>
                        {renderOpations}
                    </Form.Select>
                </div>
            </div>
        );
    }
);

export default CartItem;
