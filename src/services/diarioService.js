import * as diarioRepository
  from "../repository/diarioRepository.js";

export async function criarEntrada(
  data,
  texto
) {

  const hoje = new Date()
    .toISOString()
    .split("T")[0];

  if (!data) {
    throw new Error(
      "A data é obrigatória."
    );
  }

  if (!texto || !texto.trim()) {
    throw new Error(
      "O texto é obrigatório."
    );
  }

  if (data > hoje) {
    throw new Error(
      "Não é permitido criar entradas futuras."
    );
  }

  return await diarioRepository.criarEntrada(
    data,
    texto
  );
}

export async function listarEntradas() {

  return await diarioRepository.listarEntradas();

}