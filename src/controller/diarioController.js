import * as diarioService from "../services/diarioService.js";

export async function criarEntrada(req, res) {
    try {
        const { usuario_id, data, texto } = req.body;

        const entrada = await diarioService.criarEntrada(
            usuario_id,
            data,
            texto
        );

        res.status(201).json(entrada);

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        });
    }
}

export async function listarEntradas(req, res) {
    try {
        const { usuario_id, permissao } = req.query;

        const entradas = await diarioService.listarEntradas(
            usuario_id,
            permissao
        );

        res.json(entradas);

    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        });
    }
}