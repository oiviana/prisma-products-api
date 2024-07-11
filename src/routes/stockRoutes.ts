import express from "express";
import { createStock, listStock, updateStock, findStock } from "../controllers/stockController";

const stockRoutes = express.Router();

stockRoutes.post("/create", createStock);

stockRoutes.get("/list-all", listStock )

stockRoutes.get("/find-stock/:id", findStock )

stockRoutes.patch("/update", updateStock)

export default stockRoutes;
 