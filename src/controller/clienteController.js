import * as service from '../services/services.js';

import { Router } from "express";

const endpoints = Router();


endpoints.get('/cliente/:id', async (req, resp) => {

  let id = req.params.id;

  let cliente = await service.getCliente(id);

  resp.send(cliente);
});


endpoints.get('/cliente', async (req, resp) => {

  let clientes = await service.listClientes();

  resp.send(clientes);
});


endpoints.post('/cliente', async (req, resp) => {

  try {

    let cliente = req.body;

    let id = await service.saveCliente(cliente);

    resp.send({ id });

  } catch (err) {

    resp.status(400).send({
      erro: err.message
    });

  }
});


endpoints.put('/cliente/:id', async (req, resp) => {

  let id = req.params.id;

  let cliente = req.body;

  let qtd = await service.updateCliente(id, cliente);

  resp.send({ qtd });
});


endpoints.delete('/cliente/:id', async (req, resp) => {

  let id = req.params.id;

  let qtd = await service.deleteCliente(id);

  resp.send({ qtd });
});


export default endpoints;