import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import { articleHandler, tagHandler } from './handlers';

const app = express();
const port = 9090;
const handler = [...tagHandler, ...articleHandler];

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(express.json());

app.use(createMiddleware(...handler));
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
