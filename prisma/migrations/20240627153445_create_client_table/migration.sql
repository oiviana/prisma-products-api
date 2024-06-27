-- CreateTable
CREATE TABLE "clients" (
    "client_id" TEXT NOT NULL,
    "client_cnpj" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("client_id")
);
