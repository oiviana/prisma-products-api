import express, { Request, Response, NextFunction }  from 'express'
import clientRoutes from './routes/clientRoutes'
import addressRoutes from './routes/addressRoutes';
import productRoutes from './routes/productRoutes';
import stockRoutes from './routes/stockRoutes';
import orderRoutes from './routes/orderRoutes';
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/clients', clientRoutes);
app.use('/address', addressRoutes);
app.use('/product', productRoutes)
app.use('/stock', stockRoutes)
app.use('/order', orderRoutes)

app.use((err: unknown, _req: Request, res: Response) => {
    if (err instanceof Error) {
      console.error(err.stack);
      res.status(500).send('Algo deu errado!');
    } else {
      res.status(500).send('Algo deu errado!');
    }
  });

export default app;
