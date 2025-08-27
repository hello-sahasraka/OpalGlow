
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import verifyJWt from './middleware/auth.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import dotenv from "dotenv";
import reviewRouter from './routes/reviewRoutes.js';
dotenv.config()




const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(
    ()=> {
        console.log("Connected to the Database Successfully...");
    }
).catch(
    (e)=> {
        console.log("Connection Fail!...");
        console.log(e);
        
    }
);


app.use(bodyParser.json());
app.use(verifyJWt);


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRouter);


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});


