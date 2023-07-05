import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const controller = new AbortController();
        return () => {
            getProduct(productId, controller.signal).then((data) =>
                setProduct(data)
            );
            return () => {
                controller.abort();
            };
        };
    }, [productId]);

    async function getProduct(id, signal) {
        const response = await fetch(
            `http://localhost3000/product/${id}`,
            signal
        );
        return response.json();
    }

    if (!product) {
        return <h2>Loader...</h2>;
    }
    function handleUptadeInputs(event) {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }
    async function editProduct(id, data) {
        const response = await fetch(`http://localhost3000/products/${id}`, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        });
        return response.json();
    }
    function handleSubmit(event) {
        event.preventDefault();
        editProduct(productId, product).then(() => {
            navigate(`/product/${productId}`);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Edit product: </h1>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={product.name}
                        onChange={handleUptadeInputs}
                    />
                </div>
                <div>
                    <label htmlFor="description">Descriptoio:</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={product.description}
                        onChange={handleUptadeInputs}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={handleUptadeInputs}
                    />
                </div>
                <div>
                    <label htmlFor="stockCount">Stock Count: </label>
                    <input
                        type="number"
                        name="stockCount"
                        id="stockCount"
                        value={product.stockCount}
                        onChange={handleUptadeInputs}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    );
}

export default EditProduct;
