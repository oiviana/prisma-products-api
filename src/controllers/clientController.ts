import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";

const prisma = new PrismaClient();

const clientSchema = z.object({
  clientCnpj: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
});

// POST
export const createClient = async (req: Request, res: Response) => {
  const { clientCnpj, clientName, clientEmail } = clientSchema.parse(req.body);
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

// PUT
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { clientCnpj, clientName, clientEmail } = clientSchema.parse(req.body);

  try {
    const clientExists = await prisma.client.findUnique({
      where: { clientId: id },
    });

    if (!clientExists) {
      return res.status(404).json({ error: "cliente não encontrado" });
    }

    await prisma.client.update({
      where: { clientId: id },
      data: {
        clientCnpj,
        clientName,
        clientEmail,
      },
    });

    res.json("Cliente atualizado!");
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ error: `Erro ao atualizar cliente: ${error}` });
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
