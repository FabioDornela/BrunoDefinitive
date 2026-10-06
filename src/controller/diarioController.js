import * as diarioService
    from "../services/diarioService.js";

import {
    buscarSessao
} from "../services/sessaoService.js";


function pegarUsuario(req) {
    const autorizacao =
        req.headers.authorization;

    if (!autorizacao) {
        return null;
    }

    const partes =
        autorizacao.split(" ");

    if (partes.length !== 2) {
        return null;
    }

    if (partes[0] !== "Bearer") {
        return null;
    }

    return buscarSessao(partes[1]);
}


export async function criarEntrada(
    req,
    res
) {
    try {
        const usuario =
            pegarUsuario(req);

        if (!usuario) {
            return res.status(401).json({
                mensagem:
                    "Faça login para acessar o diário."
            });
        }

        const {
            data,
            texto
        } = req.body;

        const resultado =
            await diarioService.criarEntrada(
                usuario.id,
                data,
                texto
            );

        res.status(201).json(resultado);

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        });
    }
}


export async function listarEntradas(
    req,
    res
) {
    try {
        const usuario =
            pegarUsuario(req);

        if (!usuario) {
            return res.status(401).json({
                mensagem:
                    "Faça login para acessar o diário."
            });
        }

        const pesquisa =
            req.query.pesquisa;

        const resultado =
            await diarioService.listarEntradas(
                usuario.id,
                usuario.permissao,
                pesquisa
            );

        res.status(200).json(resultado);

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        });
    }
}


export async function editarEntrada(
    req,
    res
) {
    try {
        const usuario =
            pegarUsuario(req);

        if (!usuario) {
            return res.status(401).json({
                mensagem:
                    "Faça login para acessar o diário."
            });
        }

        const resultado =
            await diarioService.editarEntrada(
                req.params.id,
                usuario.id,
                usuario.permissao,
                req.body.data,
                req.body.texto
            );

        res.status(200).json({
            mensagem:
                "Entrada atualizada com sucesso.",
            entrada: resultado
        });

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        });
    }
}


export async function excluirEntrada(
    req,
    res
) {
    try {
        const usuario =
            pegarUsuario(req);

        if (!usuario) {
            return res.status(401).json({
                mensagem:
                    "Faça login para acessar o diário."
            });
        }

        const resultado =
            await diarioService.excluirEntrada(
                req.params.id,
                usuario.id,
                usuario.permissao
            );

        res.status(200).json(resultado);

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        });
    }
}