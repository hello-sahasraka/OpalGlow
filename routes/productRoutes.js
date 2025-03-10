import express from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/createproduct", createProduct);
productRouter.get("/getproduct", getProduct);
productRouter.delete("/deleteproduct/:productId", deleteProduct);
productRouter.put("/updateproduct/:productId", updateProduct);

export default productRouter;
