import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Product from "./components/Product.jsx";
import AddProduct from "./components/addProduct.jsx";
import EditProduct from "./components/editProduct.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "product/:productId",
        element: <Product />,
    },
    {
        path: "add-product",
        element: <AddProduct />,
    },
    {
        path: "edit-product/:productId", // product id mowi o ktorym produkcie mowmimy
        element: <EditProduct />,
    },
]);

export default router;
