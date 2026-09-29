import livrariaController from '../src/Controller/livrariaController.js';
import clienteController from '../src/Controller/clienteController.js';
export default function rotear(api) {

    api.use(livrariaController);
    api.use(clienteController);

}