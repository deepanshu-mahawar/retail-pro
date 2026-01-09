import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Product =
  mongoose.models.products || mongoose.model("Product", productSchema);
export default Product;
