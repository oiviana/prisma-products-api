import express from "express";
import { createStock, listStock } from "../controllers/stockController";

const stockRoutes = express.Router();

stockRoutes.post("/create", createStock);

stockRoutes.get("/list-all", listStock )

// clientRoutes.get("/find-client/:id", findClient )

// clientRoutes.patch("/update/:id", updateClient)

// clientRoutes.delete("/delete/:id", deleteClient )

export default stockRoutes;
 