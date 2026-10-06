import express from "express";
import cors from "cors";

import rotear from "./Rotas.js";


const api = express();

api.use(cors());

api.use(express.json());

rotear(api);


api.listen(3000, () => {
    console.log(
        "Server rodando na porta 3000!"
    );
});