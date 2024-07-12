import express from "express";
import { createOrder } from "../controllers/orderController";

const orderRoutes = express.Router();

orderRoutes.post("/create", createOrder);