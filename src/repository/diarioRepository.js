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

export async function pesquisarEntradas(
    usuario_id,
    permissao,
    pesquisa
) {
    let sql;
    let parametros;

    if (permissao === "admin") {
        sql = `
            SELECT *
            FROM diario
            WHERE texto LIKE ?
            ORDER BY data DESC
        `;

        parametros = [`%${pesquisa}%`];
    } else {
        sql = `
            SELECT *
            FROM diario
            WHERE usuario_id = ?
            AND texto LIKE ?
            ORDER BY data DESC
        `;

        parametros = [
            usuario_id,
            `%${pesquisa}%`
        ];
    }

    const [resultado] = await con.query(
        sql,
        parametros
    );

    return resultado;
}

export async function buscarEntrada(id) {
    const sql = `
        SELECT *
        FROM diario
        WHERE id = ?
    `;

    const [resultado] = await con.query(
        sql,
        [id]
    );

    return resultado[0];
}

export async function editarEntrada(
    id,
    data,
    texto
) {
    const sql = `
        UPDATE diario
        SET data = ?, texto = ?
        WHERE id = ?
    `;

    await con.query(
        sql,
        [data, texto, id]
    );

    return buscarEntrada(id);
}

export async function excluirEntrada(id) {
    const sql = `
        DELETE FROM diario
        WHERE id = ?
    `;

    await con.query(
        sql,
        [id]
    );
}