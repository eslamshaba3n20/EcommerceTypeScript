import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProductsByCatprefix, productsCleanUp } from "@store/products/productsSlice";
import { Product } from "@components/ecommerce";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
const Products = () => {
    const params = useParams();

    const dispatsh = useAppDispatch();

    const { records, error, loading } = useAppSelector(state => state.Products)


    useEffect(() => {

        dispatsh(actGetProductsByCatprefix(params.prefix as string));
        return () => {

            dispatsh(productsCleanUp());
        }

    }, [dispatsh, params]);
    return (
        <Container>
            <Loading stuts={loading} error={error} >
                <GridList
                    records={records}
                    renderItem={(recordd) => <Product {...recordd} />}
                />
            </Loading>


        </Container>
    );
};

export default Products;