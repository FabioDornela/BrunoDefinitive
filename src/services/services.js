import * as diarioRepository from "../repository/diarioRepository.js";

export async function criarEntrada(
    usuario_id,
    data,
    texto
) {
    const hoje = new Date()
        .toISOString()
        .split("T")[0];

    if (!usuario_id) {
        throw new Error(
            "O usuário é obrigatório."
        );
    }

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
        usuario_id,
        data,
        texto
    );
}

export async function listarEntradas(
    usuario_id,
    permissao
) {
    if (!usuario_id) {
        throw new Error(
            "O usuário é obrigatório."
        );
    }

    return await diarioRepository.listarEntradas(
        usuario_id,
        permissao
    );
}