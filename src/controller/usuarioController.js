import * as usuarioService
    from "../services/usuarioService.js";

export async function login(req, res) {
    try {
        const {
            usuario,
            senha
        } = req.body;

        const resultado =
            await usuarioService.login(
                usuario,
                senha
            );

        res.status(200).json(resultado);

    } catch (error) {
        res.status(401).json({
            mensagem: error.message
        });
    }
}