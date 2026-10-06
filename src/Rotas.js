import livrariaController from "./controller/livrariaController.js";
import clienteController from "./controller/clienteController.js";

import {
    criarEntrada,
    listarEntradas
} from "./controller/diarioController.js";

export default function rotear(api) {

    api.use(livrariaController);
    api.use(clienteController);

    api.post("/diario", criarEntrada);
    api.get("/diario", listarEntradas);

}