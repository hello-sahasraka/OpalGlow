import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        "email":{
            type: String,
            required: true,
            unique: true
        },

        "firstName":{
            type: String,
            required: true
        },

        "secondName":{
            type: String,
            required: true
        },

        "password":{
            type: String,
            required: true
        },

        "role":{
            type: String,
            required: true,
            default: "user"
        },

        "phone":{
            type: String
        }
    }
);

const User = mongoose.model("user", userSchema);

export default User;