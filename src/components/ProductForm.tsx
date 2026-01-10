"use client";

import { useState } from "react";
import styles from "./ProductForm.module.css";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Product Data:", formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <div className={styles.field}>
        <label>Product Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className={styles.preview} />}
      </div>

      <div className={styles.field}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.button}>
        Save Product
      </button>
    </form>
  );
}
