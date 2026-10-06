import { con } from "./connection.js";

export async function criarEntrada(
    usuario_id,
    data,
    texto
) {
    const sql = `
        INSERT INTO diario (usuario_id, data, texto)
        VALUES (?, ?, ?)
    `;

    const [resultado] = await con.query(
        sql,
        [usuario_id, data, texto]
    );

    return {
        id: resultado.insertId,
        usuario_id,
        data,
        texto
    };
}

export async function listarEntradas(
    usuario_id,
    permissao
) {
    let sql;
    let parametros = [];

    if (permissao === "admin") {
        sql = `
            SELECT *
            FROM diario
            ORDER BY data DESC
        `;
    } else {
        sql = `
            SELECT *
            FROM diario
            WHERE usuario_id = ?
            ORDER BY data DESC
        `;

        parametros = [usuario_id];
    }

    const [resultado] = await con.query(
        sql,
        parametros
    );

    return resultado;
}