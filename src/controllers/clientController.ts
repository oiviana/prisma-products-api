import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createClient = async (req: Request, res: Response) => {
  const { clientCnpj, clientName, clientEmail } = req.body;
  try {
    const newClient = await prisma.client.create({
      data: {
        clientCnpj,
        clientName,
        clientEmail,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o cliente" });
  }
};
