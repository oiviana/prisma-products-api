# Prisma products API - Structure

This backend project is built on the concept of being decoupled from the front-end, and can serve different applications, whether mobile, web or desktop.

## Project stack

- Typescript
- Prisma ORM
- Docker
- PostgreSQL
- ExpressJS

## Project database
This project uses a relational database, which is ideal for this type of inventory control structure.

![prisma-products-db](https://github.com/user-attachments/assets/fbbf7d1d-0b37-4ce8-a537-91600b2f8237)

### Database relationships
- **Product - Stock:** each product has only one stock
- **Client < Address:** each customer can have more than one address
- **Client < Order:** each customer can have more than one orders
- **Order < OrderItem:** each order can have more than one order items
- **OrderItem - Product:** each order item is linked to a product

## API Endpoints
Here we have some example endpoints that are used in the project. The structure remains basically the same for all tables, only the fields change.

```http
POST http://localhost:3333/clients/create - Create a new client/costumer
```
```json
{
  "clientCnpj": "33333034345054",
  "clientName": "Test Costumer",
  "clientEmail": "test@example.com"
}