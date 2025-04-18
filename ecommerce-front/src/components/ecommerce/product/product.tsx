import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg } = styles;

const Product = () => {
    return (
        <div className={product}>
            <div className={productImg}>
                <img
                    src="https://media.alshaya.com/adobe/assets/urn:aaid:aem:dc177cd5-adfb-4b9b-9fdd-d61d8043c0cc/as/EID-659d933c332aa39c7453ffcf02ae707f7c8d226a.jpg?preferwebp=true&height=630"
                    alt=""
                />
            </div>
            <h2>Title</h2>
            <h3>10 EGP</h3>
            <Button variant="info" style={{ color: "white" }}>
                Add to cart
            </Button>
        </div>
    );
};

export default Product;