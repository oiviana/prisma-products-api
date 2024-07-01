import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createAddress = async (req: Request, res: Response) => {
    const { street, number, postalCode, city, state, clientId } = req.body;
  try {
        // Verifica se o clientId existe na tabela de Client
        const clientExists = await prisma.client.findUnique({
          where: { clientId },
        });
    
        if (!clientExists) {
          return res.status(404).json({ error: 'Não há cliente cadastrado com esse id' });
        }

    await prisma.address.create({
        data: {
            street,
            number,
            postalCode,
            city,
            state,
            clientId, // Relaciona com o clientId
          },
    });
    res.status(201).json("Endereço cadastrado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erro ao cadastrar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};