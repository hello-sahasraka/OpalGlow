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
            type: String,
            required: true,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcosmetics%2F&psig=AOvVaw3lpHHNkg1yzTxCz3_yKO2_&ust=1741005263243000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDD0ZS064sDFQAAAAAdAAAAABAR"
        },

        stock: {
            type: Number,
            required: true
        }
    }
)

const Product = mongoose.model("product", productSchema);

export default Product;