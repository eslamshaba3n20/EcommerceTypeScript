
import { Product } from "@components/ecommerce";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Headding } from "@components/common";
import UseProducts from "@hooks/useProducts";
const Products = () => {

    // use custom hook to get the products data and loading state
    const { productFullInfo, loading, error, productPrefix } = UseProducts();

    return (
        <Container>

            <Headding title={` ${productPrefix?.toUpperCase()} products`} />

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
