import express from "express";
import { createAddress, deleteAddress, listAddresses, updateAddress } from "../controllers/addressController";

const addressRoutes = express.Router();

addressRoutes.post("/create", createAddress);

addressRoutes.get("/list-all", listAddresses);

addressRoutes.delete("/delete/:id", deleteAddress);

addressRoutes.patch("/update/:id", updateAddress);

export default addressRoutes;
