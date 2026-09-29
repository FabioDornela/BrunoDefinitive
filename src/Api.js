import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rotear from './Rotas.js';

const api = express();


api.use(express.json());
api.use(cors());

rotear(api);

const port = process.env.PORT || 3000;

api.listen(port, () => console.log(`Server rodando na porta ${port}!`));