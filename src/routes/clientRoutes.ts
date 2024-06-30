import express from "express";
import { createClient } from "../controllers/clientController";

const clientRoutes = express.Router();

clientRoutes.post("/create", createClient);

clientRoutes.get('/teste', (req, res)=>{

    return res.send("Servidor na rota de teste")
})

export default clientRoutes;
