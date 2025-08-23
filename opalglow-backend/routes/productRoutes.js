import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductById, getTrendingProducts, searchProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/createproduct", createProduct);
productRouter.get("/getproduct", getProduct);
productRouter.get("/getproductbyid/:productId", getProductById);
productRouter.delete("/deleteproduct/:productId", deleteProduct);
productRouter.put("/updateproduct/:productId", updateProduct);
productRouter.get("/searchproduct/:productId", searchProduct);
productRouter.get("/gettrendingproducts", getTrendingProducts);

export default productRouter;
