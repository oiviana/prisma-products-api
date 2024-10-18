# Prisma products API

This is a backend project that I developed with the aim of deepening my concepts of databases and API consumption. As a basis, it uses typescript and relational database.

![project_thumb](https://github.com/user-attachments/assets/7347a240-82c4-47ab-9cae-82fd540cb33b)

## Requirements to run the project

- [`NodeJS`](https://nodejs.org/pt)
- [`Postman`](https://www.postman.com/downloads/)
- [`Docker`](https://www.docker.com/products/docker-desktop/) 

## How to run the project?

- Clone the project into your machine
- Run ```npm install``` at the root folder
- With docker desktop open, run the command ```docker-compose up -d```
- Check if the containers are running with the command ```docker ps```

![Screenshot_5](https://github.com/user-attachments/assets/9ce3dd11-8c12-459a-8a6e-3d2157c0c766)

- Create a .env file at the root of the project defining the database connection address and the port on which the server will run

![Screenshot_1](https://github.com/user-attachments/assets/4647eb75-15ec-438f-bade-f955e38436b9)

- Prepare your database by running command ```npx prisma migrate dev```

- Finally, run the ```npm run dev``` command and your server is ready to go!

## Postman API collection

You can use the collection I created to query the api endpoints via Postman

[Prisma Products API Collection](https://github.com/user-attachments/files/17046812/Prisma.Products.API.postman_collection.json)

## Project structure

You can check the [project structure](./docs/project-structure.md), here!
