import { con } from "./connection.js";

export async function buscarUsuario(usuario) {
    const sql = `
        SELECT
            id,
            nome,
            usuario,
            senha,
            permissao
        FROM usuario
        WHERE usuario = ?
    `;

    const [resultado] = await con.query(
        sql,
        [usuario]
    );

    return resultado[0];
}