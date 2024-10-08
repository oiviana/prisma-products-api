import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";
import { updateStockQuantityforOrders } from "./stockController";

const prisma = new PrismaClient();

const orderItemSchema = z.object({
  productId: z.string(),
  itemQuantity: z.number(),
  itemTotalPrice: z.number(),
  orderId: z.string().optional(),
});

const ItemsSchema = z.object({
  orderItems: z.array(orderItemSchema)
});

const orderSchema = z.object({
  orderStatus: z.string(),
  orderNumber: z.string(),
  clientId: z.string(),
});

// POST
export const createOrder = async (req: Request, res: Response) => {
  const { orderStatus, clientId, orderNumber } = orderSchema.parse(req.body);

  try {
    // Primeiro, cria a ordem
    await prisma.order.create({
      data: {
        orderNumber,
        orderStatus,
        clientId,
      },
    });

    // Retorna a ordem criada e os itens do pedido
    res.status(201).json("Pedido criado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erro ao cadastrar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const createOrderItems = async (req: Request, res: Response) => {
  const { id } = req.params;
  const items = ItemsSchema.parse(req.body);

  const itemsWithOrderId = items.orderItems.map((item) => ({
    ...item,
    orderId: id,
  }));

  try {

    const hasOrder = await prisma.order.findUnique({
      where:{
        orderId: id
      }
    })

    if(!hasOrder){
      return  res.status(404).json("Não há pedido com esse id");
    }

    const itemsWithTotalPrice = await Promise.all(itemsWithOrderId.map(async (item) => {
      const { productId, itemQuantity } = item;
    
      const product = await prisma.product.findUnique({
        where: {
          productId,
        },
        select: { productPrice: true },
      });
    
      if (!product) {
        throw new Error(`Produto com ID ${productId} não encontrado`);
      }
  
      const orderItemTotalPrice = product.productPrice * itemQuantity;
    
      return {
        ...item,
        itemTotalPrice: orderItemTotalPrice
      };
    }));


    const orderItems = await prisma.orderItem.createMany({
      data: itemsWithTotalPrice,
    });

    updateStockQuantityforOrders(req, res, itemsWithTotalPrice)

    res.status(201).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erro ao cadastrar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

// GET
export const listOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: `Erro ao listar: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const findOrderWithItems = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        orderId: id,
      },
      include: {
        orderItems: {
          select: {
            itemQuantity: true,
            itemTotalPrice: true,
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(order);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ error: `Erro ao buscar pedido: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};
