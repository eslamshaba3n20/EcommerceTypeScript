import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import Logo from "@assets/svg/wishlist.svg?react";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const { container, totalNum, pumpAnimate, iconWrapper } =
    styles;

const HeaderWishList = () => {
    const navigate = useNavigate();
    const [isAnimate, setIsAnimate] = useState(false);
    const totalQuantity = useAppSelector((state) => state.wishList.itemsId);
    const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""
        }`;
    // console.log(totalQuantity)
    // عشان اهندل الانيمشن للسله
    useEffect(() => {
        if (!totalQuantity) {
            return;
        }
        setIsAnimate(true);

        const debounce = setTimeout(() => {
            setIsAnimate(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [totalQuantity]);

    return (
        <div className={container}
            onClick={() => navigate("/wishList")}
        >
            <div className={iconWrapper}>
                <Logo title="basket icon" />
                {totalQuantity.length > 0 && <div className={quantityStyle}>{totalQuantity.length}</div>}
            </div>
            <h3>WishList</h3>
        </div>
    );
};

export default HeaderWishList;