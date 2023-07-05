import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const controller = new AbortController();
        getProduct(productId, controller.signal).then((data) =>
            setProduct(data)
        );
        return () => {
            controller.abort();
        };
    }, [productId]);
    function getProduct(id, signal) {
        return fetch(`http://localhost:3000/products/${id}`, { signal }).then(
            (response) => response.json()
        );
    }

    async function deleteProduct(id) {
        return await fetch(`http://localhost:3000/products/${id}`, {
            method: "delete",
        });
    }

    async function handleDelete() {
        await deleteProduct(productId);
        navigate("/"); //zwraca z powrotem na główną strone
    }

    if (!product) {
        return <h2>Loader...</h2>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={handleDelete}>Delete Product</button>
            <button>Update</button>
            <br />
            <Link
                style={{
                    padding: "10px",
                    margin: "10px",
                    textDecoration: "none",
                }}
                to={`/edit-product/${product.id}`}
            >
                Edit
            </Link>
            <br />
            <Link to="/">Back</Link>
        </div>
    );
}

export default Product;
