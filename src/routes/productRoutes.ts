import express from "express";
import { createProduct, listProducts } from "../controllers/productController";

const productRoutes = express.Router();

productRoutes.post("/create", createProduct);

productRoutes.get("/list-all", listProducts)

export default productRoutes;