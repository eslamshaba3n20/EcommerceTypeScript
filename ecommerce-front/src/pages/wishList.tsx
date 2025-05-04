

import { GridList, Headding } from "@components/common";
import { Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@customTypes/products";
import UseWishList from "@hooks/useWishList";

const WishList = () => {
    const { records, loading, error } = UseWishList();
    return (
        <>
            <Headding title="Your Wishlist" />
            <Loading error={error} stuts={loading} >
                <GridList<TProduct>
                    records={records}
                    renderItem={(record) => <Product {...record} />}
                />
            </Loading>
        </>
    );
};

export default WishList;