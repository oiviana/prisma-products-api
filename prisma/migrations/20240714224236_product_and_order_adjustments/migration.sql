/*
  Warnings:

  - You are about to alter the column `product_price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - Added the required column `order_number` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "product_price" SET DATA TYPE INTEGER;
