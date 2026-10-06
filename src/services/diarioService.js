import * as diarioRepository
    from "../repository/diarioRepository.js";


function obterDataAtual() {
    return new Date()
        .toISOString()
        .split("T")[0];
}


function validarTexto(texto) {
    if (!texto || !texto.trim()) {
        throw new Error(
            "O texto da entrada é obrigatório."
        );
    }
}


function validarData(data) {
    const hoje = obterDataAtual();

    if (data > hoje) {
        throw new Error(
            "Não é permitido criar entradas futuras."
        );
    }
}


export async function criarEntrada(
    usuario_id,
    data,
    texto
) {
    validarTexto(texto);

    const dataFinal =
        data || obterDataAtual();

    validarData(dataFinal);

    return await diarioRepository.criarEntrada(
        usuario_id,
        dataFinal,
        texto.trim()
    );
}


export async function listarEntradas(
    usuario_id,
    permissao,
    pesquisa
) {
    if (pesquisa) {
        return await diarioRepository
            .pesquisarEntradas(
                usuario_id,
                permissao,
                pesquisa
            );
    }

    return await diarioRepository.listarEntradas(
        usuario_id,
        permissao
    );
}


export async function editarEntrada(
    id,
    usuario_id,
    permissao,
    data,
    texto
) {
    validarTexto(texto);

    const entrada =
        await diarioRepository.buscarEntrada(id);

    if (!entrada) {
        throw new Error(
            "Entrada não encontrada."
        );
    }

    if (
        permissao !== "admin" &&
        entrada.usuario_id !== usuario_id
    ) {
        throw new Error(
            "Você não pode editar essa entrada."
        );
    }

    const dataFinal =
        data ||
        String(entrada.data).split("T")[0];

    validarData(dataFinal);

    return await diarioRepository.editarEntrada(
        id,
        dataFinal,
        texto.trim()
    );
}


export async function excluirEntrada(
    id,
    usuario_id,
    permissao
) {
    const entrada =
        await diarioRepository.buscarEntrada(id);

    if (!entrada) {
        throw new Error(
            "Entrada não encontrada."
        );
    }

    if (
        permissao !== "admin" &&
        entrada.usuario_id !== usuario_id
    ) {
        throw new Error(
            "Você não pode excluir essa entrada."
        );
    }

    await diarioRepository.excluirEntrada(id);

    return {
        mensagem: "Entrada excluída com sucesso."
    };
}