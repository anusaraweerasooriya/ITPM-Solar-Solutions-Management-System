import mongoose from "mongoose";

const ProductRequestSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        relatedProduct: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        Messages: String,
    }
);

const ProductRequest = mongoose.model("productRequest", ProductRequestSchema);
export default ProductRequest;