import { Container } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";
import { GridList, Headding } from "@components/common";
import { Loading } from "@components/feedback";
import { Category } from "@components/ecommerce";

const Categories = () => {
    const dispatsh = useAppDispatch();

    const { loading, error, records } = useAppSelector(
        (state) => state.categories
    );

    useEffect(() => {
        //  دا عشان ينادي عليها اول مره بس مش كل ميعمل ريفرش
        if (!records.length) {
            dispatsh(actGetCategories());
        }
    }, [dispatsh]);

    return (
        <>
            <Headding>Categories</Headding>
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
