import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";

const prisma = new PrismaClient();

const orderItemSchema = z.object({
  productId: z.string(),
  orderId: z.string(),
  itemQuantity: z.number(),
  itemTotalPrice: z.number(),
});

const orderSchema = z.object({
  orderStatus: z.string(),
  clientId: z.string(),
  orderId: z.string(),
  productId: z.string(),
  orderItems: z.array(orderItemSchema),
});

// POST
export const createClient = async (req: Request, res: Response) => {
  const { orderStatus, clientId, orderItems } = orderSchema.parse(req.body);
  try {
    await prisma.order.create({
      data: {
        orderStatus,
        clientId,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
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
