import express from 'express'
import clientRoutes from './routes/clientRoutes'
import addressRoutes from './routes/addressRoutes';

const app = express();

app.use(express.json());

app.use('/clients', clientRoutes);
app.use('/address', addressRoutes);

export default app;
