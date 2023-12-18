import express, { Express } from 'express';
import 'dotenv/config';
import Routes from './routes';

const app: Express = express();

app.use(express.json());

// User routes
app.use('/api/v1', Routes);

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`🚀  Server is running at http://localhost:${port}`));