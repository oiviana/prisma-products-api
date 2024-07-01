/*
  Warnings:

  - A unique constraint covering the columns `[client_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[client_email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_client_id_key" ON "addresses"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_client_email_key" ON "clients"("client_email");
