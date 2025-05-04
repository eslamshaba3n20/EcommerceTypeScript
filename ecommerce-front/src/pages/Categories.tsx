
import { GridList, Headding } from "@components/common";
import { Loading } from "@components/feedback";
import { Category } from "@components/ecommerce";
import UseCategories from "@hooks/useCategories";
import { Container } from "react-bootstrap";

const Categories = () => {
    const { records, loading, error } = UseCategories();
    return (
        <>
            <Headding title="Categories" />
            <Container>
                <Loading stuts={loading} error={error}>
                    <GridList
                        records={records}
                        renderItem={(record) => <Category {...record} />}
                    />
                </Loading>
            </Container>
        </>
    );
};

export default Categories;
