import { Category } from "@components/ecommerce";
import { Container, Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";

const Categories = () => {
    const dispatsh = useAppDispatch();

    const { loading, error, records } = useAppSelector(state => state.categories);

    const categoriesList = records.length > 0 ? records.map((record) => (
        <Col xs={6} md={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            <Category {...record} />
        </Col>
    )) : "there no Categories ";

    useEffect(() => {
        //  دا عشان ينادي عليها اول مره بس مش كل ميعمل ريفرش
        if (!records.length) {

            dispatsh(actGetCategories());
        }
    }, [dispatsh]);

    return (
        <Container>
            <Row>
                {categoriesList}
            </Row>
        </Container>
    );
};

export default Categories;