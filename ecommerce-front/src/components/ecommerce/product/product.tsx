import { useState, useEffect, memo } from "react";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/CartSlice";
import Like from "@assets/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/products";
import { actLikeToggle } from "@store/wishList/wishListSlice";
import { Button, Spinner } from "react-bootstrap";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
    ({ id, title, img, price, max, quantity, isLiked }: TProduct) => {
        const dispatch = useAppDispatch();
        console.log("render product");
        const [isBtnDisabled, setIsBtnDisabled] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        // هنا هجيب الكميه المتبقيه من السله من الريداكس
        const currentRemainQuantity = max - (quantity ?? 0);
        // دا متغير عشان اهندل في الليمت بتاع المنتج اللي ممكن اختاره من السله
        const quantatyRetchedToMax = currentRemainQuantity <= 0 ? true : false;
        // عشان يهندل زرار ال اضافه للسله يبقي مختفي وقت مبيعمل انيميشن
        useEffect(() => {
            if (!isBtnDisabled) {
                return;
            }

            setIsBtnDisabled(true);
            const dounbnce = setTimeout(() => {
                setIsBtnDisabled(false);
            }, 300);

            return () => clearTimeout(dounbnce);
        }, [isBtnDisabled]);

        const handleAddToCart = () => {
            dispatch(addToCart(id));
            setIsBtnDisabled(true);
        };

        const LikeToggleHandler = () => {
            if (isLoading) {
                return;
            }
            setIsLoading(true);
            dispatch(actLikeToggle(id))
                .unwrap()
                .then(() => { setIsLoading(false) })
                .catch(() => { setIsLoading(false) });
        };
        return (
            <div className={product}>
                <div onClick={LikeToggleHandler} className={wishlistBtn}
                >
                    {isLoading ? (
                        <Spinner animation="border" size="sm" variant="primary" />
                    ) : isLiked ? (
                        <LikeFill />
                    ) : (
                        <Like />
                    )}                </div>
                <div className={productImg}>
                    <img src={img} alt={title} />
                </div>
                <h2>{title}</h2>
                <h3>{price.toFixed(2)} EGP</h3>
                <p className={maximumNotice}>
                    {quantatyRetchedToMax
                        ? "you reached to limited"
                        : `you can add ${currentRemainQuantity} product`}
                </p>
                <Button
                    onClick={() => {
                        handleAddToCart();
                    }}
                    variant="info"
                    style={{ color: "white" }}
                    // الزرار يختفي في حالتين اول حاله وانا بضيف في السلع تاني حاله لما يوصل للليميت
                    disabled={isBtnDisabled || quantatyRetchedToMax}
                >
                    {isBtnDisabled ? (
                        <>
                            <Spinner animation="border" size="sm" /> Loading...
                        </>
                    ) : (
                        "Add to cart"
                    )}
                </Button>
            </div>
        );
    }
);

export default Product;
