import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const productSchema = z.object({
  productName: z.string(),
  productCategory: z.string(),
  productDescription: z.string(),
  productPrice: z.number(),
});

// POST
export const createProduct = async (req: Request, res: Response) => {
  const { productName, productCategory, productDescription, productPrice } =
    productSchema.parse(req.body);
  try {
    await prisma.product.create({
      data: {
        productName,
        productCategory,
        productDescription,
        productPrice,
      },
    });
    res.status(201).json("Produto cadastrado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erro ao cadastrar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// GET
export const listProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    const formattedProducts = products.map((product) => ({
      ...product,
      productPrice: Number(product.productPrice),
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: `Erro ao listar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const findProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        productId: id,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: `Erro ao buscar produto: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// PUT
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productName, productCategory, productDescription, productPrice } =
    productSchema.parse(req.body);

  try {
    // Verifica se o produto existe
    const productExists = await prisma.product.findUnique({
      where: { productId: id },
    });

    if (!productExists) {
      return res.status(404).json({ error: "produto não encontrado" });
    }

    // Atualiza o produto
    await prisma.product.update({
      where: { productId: id },
      data: {
        productName,
        productCategory,
        productDescription,
        productPrice,
      },
    });

    res.json("Produto atualizado!");
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: `Erro ao atualizar produto: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};
