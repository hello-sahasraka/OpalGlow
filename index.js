
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import verifyJWt from './middleware/auth.js';
import orderRoutes from './routes/orderRoutes.js';



const app = express();

mongoose.connect("mongodb+srv://admin:123@cluster0.vvjrb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=> {
        console.log("Connected to the Database Successfully...");
    }
).catch(
    ()=> {
        console.log("Connection Fail!...");
    }
);


app.use(bodyParser.json());
app.use(verifyJWt);


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRoutes);


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});


