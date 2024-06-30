import express from "express";
import app from "./app";


const port = process.env.SERVER_PORT ?? 3000;

app.listen(port, () => console.log(`server is running on port ${port}`));
