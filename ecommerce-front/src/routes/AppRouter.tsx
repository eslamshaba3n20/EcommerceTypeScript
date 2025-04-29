import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import { MainLayout } from "@layouts/index";
//pages
import {
    Home,
    Create,
    AboutUs,
    Categories,
    Products,
    Login,
    Register,
    Error,
} from "@pages/index";
import Cart from "@pages/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: "create", element: <Create /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "categories", element: <Categories /> },
            { path: "cart", element: <Cart /> },
            {
                path: "categories/products/:prefix",
                element: <Products />,
                loader: ({ params }) => {
                    if (
                        typeof params.prefix !== "string" ||
                        !/^[a-z]+$/i.test(params.prefix)
                    ) {
                        throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400,
                        });
                    }
                    return true;
                },
            },
        ],
    },
]);
const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
