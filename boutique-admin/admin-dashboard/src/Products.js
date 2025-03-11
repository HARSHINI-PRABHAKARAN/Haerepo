import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    axios.get(API_URL).then((res) => setProducts(res.data));
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    axios.post(API_URL, newProduct).then((res) => {
      setProducts([...products, res.data]);
    });
  };

  return (
    <div className="container">
      <h2>🛒 Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price} - Stock: {product.stock}</li>
        ))}
      </ul>
      <div className="input-group">
        <input name="name" placeholder="Product Name" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="stock" placeholder="Stock" onChange={handleChange} />
        <button onClick={addProduct}>➕ Add Product</button>
      </div>
    </div>
  );
}

export default Products;
