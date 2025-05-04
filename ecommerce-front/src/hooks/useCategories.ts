import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetCategories, cleanCategoriesRecords } from "@store/categories/categoriesSlice";
import { useEffect } from "react";

const UseCategories = () => {
    const dispatsh = useAppDispatch();

    const { loading, error, records } = useAppSelector(
        (state) => state.categories
    );

    useEffect(() => {
        //  دا عشان ينادي عليها اول مره بس مش كل ميعمل ريفرش
        if (!records.length) {
            const promise = dispatsh(actGetCategories());

            return () => {
                promise.abort();

                dispatsh(cleanCategoriesRecords());
            }
        }
    }, [dispatsh]);

    return { records, loading, error }
}

export default UseCategories;
