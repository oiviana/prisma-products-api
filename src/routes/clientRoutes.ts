import express from "express";
import { createClient, listClients, findClient } from "../controllers/clientController";

const clientRoutes = express.Router();

clientRoutes.post("/create", createClient);

clientRoutes.get("/list-clients", listClients )

clientRoutes.get("/find-client/:id", findClient )

export default clientRoutes;
