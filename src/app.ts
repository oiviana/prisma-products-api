import express from 'express'
import clientRoutes from './routes/clientRoutes'

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

app.use('/clients', clientRoutes);

export default app;
