import * as usuarioRepository
    from "../repository/usuarioRepository.js";

import {
    criarSessao
} from "./sessaoService.js";

export async function login(
    usuario,
    senha
) {
    if (!usuario || !senha) {
        throw new Error(
            "Usuário e senha são obrigatórios."
        );
    }

    const encontrado =
        await usuarioRepository.buscarUsuario(
            usuario
        );

    if (!encontrado) {
        throw new Error(
            "Usuário ou senha inválidos."
        );
    }

    if (encontrado.senha !== senha) {
        throw new Error(
            "Usuário ou senha inválidos."
        );
    }

    const usuarioLogado = {
        id: encontrado.id,
        nome: encontrado.nome,
        usuario: encontrado.usuario,
        permissao: encontrado.permissao
    };

    const token =
        criarSessao(usuarioLogado);

    return {
        mensagem: "Login realizado com sucesso.",
        token,
        usuario: usuarioLogado
    };
}