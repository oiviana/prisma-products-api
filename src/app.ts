import express from 'express'
import clientRoutes from './routes/clientRoutes'
import addressRoutes from './routes/addressRoutes';
import productRoutes from './routes/productRoutes';
import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import helmet from 'helmet';
import stockRoutes from './routes/stockRoutes';

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/clients', clientRoutes);
app.use('/address', addressRoutes);
app.use('/product', productRoutes)
app.use('/stock', stockRoutes)

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      console.error(err.stack);
      res.status(500).send('Algo deu errado!');
    } else {
      res.status(500).send('Algo deu errado!');
    }
  });

export default app;
