import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts

// بستخدم ليزي عشان احمل الصفحات بشكل داينيمك بحيث انه يجيب الصفحه اللي اطلبها بس مش كله مع ب
// عشان احسن من اداء الويب سايت
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const Home = lazy(() => import("@pages/Home"));
const Create = lazy(() => import("@pages/Create"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Error = lazy(() => import("@pages/Error"));
const Cart = lazy(() => import("@pages/Cart"));
const WishList = lazy(() => import("@pages/wishList"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback="Loading wait.....">
                <MainLayout />
            </Suspense>
        ),
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: (
                    // عشان يهندل اللودنج متظهرش صفحه بيضاء علي متيجي من السيرفر
                    <Suspense fallback="Loading wait.....">
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "create",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <Create />
                    </Suspense>
                ),
            },
            {
                path: "about-us",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <AboutUs />
                    </Suspense>
                ),
            },
            {
                path: "login",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "register",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: "categories",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <Categories />
                    </Suspense>
                ),
            },
            {
                path: "cart",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <Cart />
                    </Suspense>
                ),
            },
            {
                path: "wishList",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <WishList />
                    </Suspense>
                ),
            },
            {
                path: "categories/products/:prefix",
                element: (
                    <Suspense fallback="Loading wait.....">
                        <Products />
                    </Suspense>
                ),
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

// دا لو كنت هستدعيهم عادي من غير ليزي
//pages
// import {
//     Home,
//     Create,
//     AboutUs,
//     Categories,
//     Products,
//     Login,
//     Register,
//     Error,
//     Cart,
//     WishList
// } from "@pages/index";
