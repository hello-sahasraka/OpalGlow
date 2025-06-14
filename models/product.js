import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        altNames: {
            type: [String],
            default: []
        },

        price: {
            type: Number,
            required: true
        },

        labeledPrice: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        image: {
            type: [String],
            required: true,
            default: []
        },

        stock: {
            type: Number,
            required: true
        }
    }
)

const Product = mongoose.model("product", productSchema);

export default Product;