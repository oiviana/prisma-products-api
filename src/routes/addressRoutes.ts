import express from "express";
import { createAddress } from "../controllers/addressController";

const addressRoutes = express.Router();

addressRoutes.post("/create", createAddress);

// clientRoutes.get("/find-client/:id", findClient )

export default addressRoutes;
