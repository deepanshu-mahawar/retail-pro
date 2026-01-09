import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
  },
  productStock: {
    type: Number,
    required: [true, "Product stock is required"],
  },
  productCategory: {
    type: String,
    required: [true, "Product category is required"],
  },
  productDescription: {
    type: String,
    required: false,
  },
});

const Product =
  mongoose.models.products || mongoose.model("Product", productSchema);
export default Product;
