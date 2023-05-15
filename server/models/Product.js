import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    productType: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      enum: ["SolarPanel", "Inverter", "Battery"],
    },
    features: Array,
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;