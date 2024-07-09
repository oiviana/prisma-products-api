import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const stockSchema = z.object({
  productId: z.string(),
  stockQuantity: z.number(),
});

// POST
export const createStock = async (req: Request, res: Response) => {
  const { productId, stockQuantity } = stockSchema.parse(req.body);

  try {
    const productExists = await prisma.product.findUnique({
      where: { productId },
    });

    if (!productExists) {
      return res
        .status(404)
        .json({ error: "Não há um produto cadastrado com esse id" });
    }

    await prisma.stock.create({
      data: {
        productId,
        stockQuantity,
      },
    });
    res.status(201).json("Estoque criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erro ao cadastrar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// GET
export const listStock = async (_req: Request, res: Response) => {
  try {
    const stocks = await prisma.stock.findMany({
      include: {
        product: {
          select: {
            productName: true,
          },
        },
      },
    });

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: `Erro ao listar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const findStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const stock = await prisma.stock.findUnique({
      where: {
        productId: id,
      },
      include: {
        product: {
          select: {
            productName: true,
          },
        },
      },
    });

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: `Erro ao listar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// PUT
export const updateStock = async (req: Request, res: Response) => {
  const { stockQuantity, productId } = stockSchema.parse(req.body);

  try {
    const productExists = await prisma.product.findUnique({
      where: { productId },
    });

    if (!productExists) {
      return res.status(404).json({ error: "produto não encontrado" });
    }

    const currentStock = await prisma.stock.findUnique({
      where: {
        productId,
      },
      select: { stockQuantity: true },
    });
    
    if(currentStock){
      await prisma.stock.update({
        where: { productId },
        data: {
          stockQuantity: currentStock?.stockQuantity + stockQuantity,
        },
      });
      res.json("Estoque atualizado!");
    }

  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    res.status(500).json({ error: `Erro ao atualizar estoque: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};
