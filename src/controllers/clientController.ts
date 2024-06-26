import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// POST
export const createClient = async (req: Request, res: Response) => {
  const { clientCnpj, clientName, clientEmail } = req.body;
  try {
    await prisma.client.create({
      data: {
        clientCnpj,
        clientName,
        clientEmail,
      },
    });
    res.status(201).json("Cliente cadastrado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erro ao cadastrar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// GET
export const listClients = async (_req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: `Erro ao listar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const findClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const client = await prisma.client.findUnique({
      where: {
        clientId: id,
      },
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json(client);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).json({ error: `Erro ao buscar cliente: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// DELETE

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const client = await prisma.client.findUnique({
      where: {
        clientId: id,
      },
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await prisma.address.deleteMany({
      where: { clientId: id },
    });

    await prisma.client.delete({
      where: { clientId: id },
    });

    res.json("Cliente deletado");
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    res.status(500).json({ error: `Erro ao deletar cliente: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};
