import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProductsByCatprefix, productsCleanUp } from "@store/products/productsSlice";
import { Product } from "@components/ecommerce";
import { Container, Row, Col } from "react-bootstrap";
const Products = () => {
    const params = useParams();

    const dispatsh = useAppDispatch();

    const { records, error, loading } = useAppSelector(state => state.Products)

    const productsList = records.length > 0 ? records.map((record) => (
        <Col xs={6} md={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            <Product {...record} />
        </Col>
    )) : "there no Categories ";
    useEffect(() => {

        dispatsh(actGetProductsByCatprefix(params.prefix as string));
        return () => {

            dispatsh(productsCleanUp());
        }

    }, [dispatsh, params]);
    return (
        <Container>
            <Row>
                {productsList}
            </Row>
        </Container>
    );
};

export default Products;