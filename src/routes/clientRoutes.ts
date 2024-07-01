import express from "express";
import { createClient, listClients, findClient, deleteClient } from "../controllers/clientController";

const clientRoutes = express.Router();

clientRoutes.post("/create", createClient);

clientRoutes.get("/list-all", listClients )

clientRoutes.get("/find-client/:id", findClient )

clientRoutes.delete("/delete/:id", deleteClient )

export default clientRoutes;
