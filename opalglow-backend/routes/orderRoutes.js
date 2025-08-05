import express from 'express';
import { createOrder, getOrders, updateOrder } from '../controllers/orderController.js';

const orderRoutes = express.Router();

orderRoutes.post("/createorder", createOrder);
orderRoutes.get("/getorder", getOrders);
orderRoutes.put("/updateorder/:orderId", updateOrder);

export default orderRoutes;