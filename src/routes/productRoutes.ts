import express from "express";
import { createProduct, deleteProduct, findProduct, listProducts, updateProduct } from "../controllers/productController";

const productRoutes = express.Router();

productRoutes.post("/create", createProduct);

productRoutes.get("/list-all", listProducts)

productRoutes.get("/find-product/:id", findProduct )

productRoutes.patch("/update/:id", updateProduct)

productRoutes.delete("/delete/:id", deleteProduct);

export default productRoutes;