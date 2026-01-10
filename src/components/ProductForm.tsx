"use client";

import { useState } from "react";
import styles from "./ProductForm.module.css";
import axios from "axios";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    // image: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const [preview, setPreview] = useState<string | null>(null);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setFormData({ ...formData, image: file });
  //   setPreview(URL.createObjectURL(file));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/user/product", formData);
      console.log("Product created successful", response.data);
      setLoading(false);
      setSuccess("Product created successfully");
      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        // image: null as File | null,
      });
    } catch (error) {
      console.log("Failed to create product:", error);
      setError("Failed to create product");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.success}>{error}</p>}
      <h2>Add Product</h2>

      {/* <div className={styles.field}>
        <label>Product Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className={styles.preview} />}
      </div> */}

      <div className={styles.field}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          // onChange={handleChange}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            // onChange={handleChange}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.field}>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            // onChange={handleChange}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          // onChange={handleChange}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="grocery">Grocery</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Description</label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          // onChange={handleChange}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <button type="submit" className={styles.button}>
        {loading ? "Loading..." : "Save Product"}
      </button>
    </form>
  );
}
