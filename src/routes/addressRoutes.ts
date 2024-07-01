import express from "express";
import { createAddress, deleteAddress, listAddresses } from "../controllers/addressController";

const addressRoutes = express.Router();

addressRoutes.post("/create", createAddress);

addressRoutes.get("/list-all", listAddresses);

addressRoutes.delete("/delete/:id", deleteAddress);

// clientRoutes.get("/find-client/:id", findClient )

export default addressRoutes;
