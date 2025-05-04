
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
    actGetProductsByCatprefix,
    cleanProductsRecords,
} from "@store/products/productsSlice";

const UseProducts = () => {
    const params = useParams();

    const dispatsh = useAppDispatch();
    const productPrefix = params.prefix;

    const { records, error, loading } = useAppSelector((state) => state.Products);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishListItems = useAppSelector((state) => state.wishList.itemsId);

    const productFullInfo = records.map((record) => {
        return {
            ...record, quantity: cartItems[record.id] || 0,
            isLiked: wishListItems.includes(record.id),
        };
    });

    useEffect(() => {
        const promise = dispatsh(actGetProductsByCatprefix(params.prefix as string));
        return () => {
            promise.abort();
            // clean the records in the store
            dispatsh(cleanProductsRecords());
        };
    }, [dispatsh, params]);
    return { productFullInfo, loading, error, productPrefix }
}

export default UseProducts;
