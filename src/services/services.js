import * as db from '../repository/clienteRepository.js';


export async function saveCliente(cliente) {

  // CPF não pode repetir
  let clienteCpf = await db.getClienteByCpf(cliente.cpf);

  if (clienteCpf != null) {
    throw new Error('CPF já cadastrado.');
  }


  // Nome não pode repetir
  let clienteNome = await db.getClienteByNome(cliente.nome);

  if (clienteNome != null) {
    throw new Error('Nome já cadastrado.');
  }


  // Valor não pode ser 0 ou negativo
  if (cliente.valor <= 0) {
    throw new Error('O valor deve ser maior que 0.');
  }


  return db.saveCliente(cliente);
}


export async function getCliente(id) {
  return db.getCliente(id);
}


export async function listClientes() {
  return db.listClientes();
}


export async function updateCliente(id, cliente) {
  return db.updateCliente(id, cliente);
}


export async function deleteCliente(id) {
  return db.deleteCliente(id);
}