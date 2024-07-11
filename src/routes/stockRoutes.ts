import express from "express";
import { createStock, listStock, updateStock } from "../controllers/stockController";

const stockRoutes = express.Router();

stockRoutes.post("/create", createStock);

stockRoutes.get("/list-all", listStock )

// clientRoutes.get("/find-client/:id", findClient )

stockRoutes.patch("/update", updateStock)

// clientRoutes.delete("/delete/:id", deleteClient )

export default stockRoutes;
 