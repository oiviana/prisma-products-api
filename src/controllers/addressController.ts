import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// GET
export const listAddresses = async (_req: Request, res: Response) => {
  try {
    const addresses = await prisma.address.findMany();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: `Erro ao listar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// POST
export const createAddress = async (req: Request, res: Response) => {
  const { street, number, postalCode, city, state, clientId } = req.body;
  try {
    // Verifica se o clientId existe na tabela de Client
    const clientExists = await prisma.client.findUnique({
      where: { clientId },
    });

    if (!clientExists) {
      return res
        .status(404)
        .json({ error: "Não há cliente cadastrado com esse id" });
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

// DELETE
export const deleteAddress = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const address = await prisma.address.findUnique({
      where: {
        addressId: id,
      },
    });

    if (!address) {
      return res.status(404).json({ error: "Endereço não encontrado" });
    }

    await prisma.address.delete({
      where: { addressId: id },
    });

    res.json("Endereço deletado");
  } catch (error) {
    console.error("Erro ao deletar endereço:", error);
    res.status(500).json({ error: `Erro ao deletar endereço: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// PUT
export const updateAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { street, number, postalCode, city, state } = req.body;

  try {
    // Verifica se o endereço existe
    const addressExists = await prisma.address.findUnique({
      where: { addressId: id },
    });

    if (!addressExists) {
      return res.status(404).json({ error: "Endereço não encontrado" });
    }

    // Atualiza o endereço
    await prisma.address.update({
      where: { addressId: id },
      data: {
        street,
        number,
        postalCode,
        city,
        state,
      },
    });

    res.json("Endereço atualizado!");
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    res.status(500).json({ error: `Erro ao atualizar endereço: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};
