import { TProduct } from '@customTypes/products';
import Styles from './style.module.css';
type CartSubTotalPriceProps = { prodcuts: TProduct[] };

const CartSubTotalPrice = ({ prodcuts }: CartSubTotalPriceProps) => {
    const subTotal = prodcuts.reduce((accumulator, el) => {
        const price = el.price;
        const quantity = el.quantity;
        if (quantity && typeof quantity === "number") {
            return accumulator + price * quantity;
        } else {
            return accumulator;
        }
    }, 0);

    return (
        <div className={Styles.container}>
            <span>subTotal:</span>
            <span>{subTotal.toFixed(2)} EGP</span>
        </div>
    );
}

export default CartSubTotalPrice;