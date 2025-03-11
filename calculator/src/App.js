import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://your-api-endpoint.com/products"; // Replace with your actual API

export default function BoutiqueApp() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(API_URL, newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: "", price: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, editingProduct);
      setProducts(products.map((product) => (product.id === id ? response.data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Boutique Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <button onClick={addProduct} className="bg-blue-500 text-white p-2 rounded">Add Product</button>
      </div>

      {products.map((product) => (
        <div key={product.id} className="p-2 border-b flex justify-between">
          {editingProduct?.id === product.id ? (
            <>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="p-2 border rounded mr-2"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="p-2 border rounded mr-2"
              />
              <button onClick={() => updateProduct(product.id)} className="bg-green-500 text-white p-2 rounded">Save</button>
            </>
          ) : (
            <>
              <span>{product.name} - ${product.price}</span>
              <div>
                <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
