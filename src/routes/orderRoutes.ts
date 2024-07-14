import express from "express";
import { createOrder, createOrderItems, findOrderWithItems } from "../controllers/orderController";

const orderRoutes = express.Router();

orderRoutes.post("/create", createOrder);
orderRoutes.post("/create-items/:id", createOrderItems);
orderRoutes.get("/list-with-items/:id", findOrderWithItems);

export default orderRoutes;
