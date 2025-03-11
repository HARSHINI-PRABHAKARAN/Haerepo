import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const API_URL = "http://localhost:5000/products";

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Boutique Admin Dashboard</h1>
            <nav>
                <Link to="/products">Products</Link>
            </nav>
        </div>
    );
}

function Products() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get(API_URL).then((res) => setProducts(res.data)).catch((err) => console.error(err));
    };

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const addProduct = () => {
        axios.post(API_URL, newProduct)
            .then((res) => {
                setProducts([...products, res.data]);
                setNewProduct({ name: "", price: "", stock: "" });
            })
            .catch((err) => console.error(err));
    };

    const deleteProduct = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setProducts(products.filter((product) => product.id !== id));
            })
            .catch((err) => console.error(err));
    };

    const updateProduct = (id) => {
        axios.put(`${API_URL}/${id}`, newProduct)
            .then(() => {
                fetchProducts();
                setNewProduct({ name: "", price: "", stock: "" });
            })
            .catch((err) => console.error(err));
    };

    const patchProduct = (id, updateData) => {
        axios.patch(`${API_URL}/${id}`, updateData)
            .then(() => {
                fetchProducts();
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="container">
            <h2>Manage Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price} - Stock: {product.stock}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        <button onClick={() => updateProduct(product.id)}>Update</button>
                        <button onClick={() => patchProduct(product.id, { stock: product.stock - 1 })}>Decrease Stock</button>
                    </li>
                ))}
            </ul>
            <div className="input-group">
                <input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} />
                <input name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} />
                <input name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} />
                <button onClick={addProduct}>Add Product</button>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Dashboard />
            <Routes>
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
}

export default App;
