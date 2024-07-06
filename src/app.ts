import express from 'express'
import clientRoutes from './routes/clientRoutes'
import addressRoutes from './routes/addressRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(express.json());

app.use('/clients', clientRoutes);
app.use('/address', addressRoutes);
app.use('/product', productRoutes)

export default app;
