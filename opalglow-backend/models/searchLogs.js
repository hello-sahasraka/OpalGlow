import mongoose from "mongoose";

const searchLogSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },

    searchedAt:{
        type: Date,
        default: Date.now,
        expires: "30d"
    }
})

const SearchLog = mongoose.model("searchLog", searchLogSchema);

export default SearchLog;