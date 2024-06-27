-- CreateTable
CREATE TABLE "orders" (
    "order_id" TEXT NOT NULL,
    "order_status" TEXT NOT NULL,
    "client_id" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("client_id") ON DELETE SET NULL ON UPDATE CASCADE;
