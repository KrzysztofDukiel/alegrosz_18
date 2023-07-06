import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stockCount, setStockCount] = useState("");

    const navigate = useNavigate();

    async function handleAddProduct(event) {
        event.preventDefault();
        const product = await addProduct({
            name,
            description,
            price,
            stockCount,
        });
        navigate(`/product/${product.id}`);
    }

    async function addProduct(data) {
        const response = await fetch("http://localhost:3000/products", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    }

    return (
        <div>
            <Grid item xs={12} md={8}>
                <Typography variant="h2" component="h1">
                    Add new product
                </Typography>

                <form
                    onSubmit={handleAddProduct}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 15,
                    }}
                >
                    <div>
                        <TextField
                            id="name"
                            label="Name"
                            variant="filled"
                            fullWidth
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                    </div>
                    <div>
                        <TextField
                            label="description"
                            multiline
                            name="description"
                            id="description"
                            fullWidth
                            value={description}
                            variant="filled"
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            type="number"
                            name="price"
                            id="price"
                            value={price}
                            placeholder="Type price"
                            variant="filled"
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            type="number"
                            name="stockCount"
                            id="stockCount"
                            value={stockCount}
                            onChange={(event) =>
                                setStockCount(event.target.value)
                            }
                            placeholder="Type price"
                            variant="filled"
                        />
                    </div>
                    <Button variant="cotanined" type="submit">
                        Add product
                    </Button>
                    <Button variant="cotanined">
                        <Link style={{ textDecoration: "none" }} to="/">
                            Back
                        </Link>
                    </Button>
                </form>
            </Grid>
        </div>
    );
}

export default AddProduct;
