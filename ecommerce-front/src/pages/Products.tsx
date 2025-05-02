import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
    actGetProductsByCatprefix,
    productsCleanUp,
} from "@store/products/productsSlice";
import { Product } from "@components/ecommerce";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Headding } from "@components/common";
const Products = () => {
    const params = useParams();

    const dispatsh = useAppDispatch();

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
        dispatsh(actGetProductsByCatprefix(params.prefix as string));
        return () => {
            dispatsh(productsCleanUp());
        };
    }, [dispatsh, params]);
    return (
        <Container>
            <Headding>
                <span className="text-uppercase">{params.prefix}</span> Products
            </Headding>

            <Loading stuts={loading} error={error}>
                <GridList
                    records={productFullInfo}
                    renderItem={(recordd) => <Product {...recordd} />}
                />
            </Loading>
        </Container>
    );
};

export default Products;
