import { con } from "./connection.js";

export async function saveLivro(livro) {
    const command = `
        insert into livros
        (nome, genero, sinopse, avaliacao, disponivel)
        values (?, ?, ?, ?, ?)
    `;

    const [result] = await con.query(command, [
        livro.nome,
        livro.genero,
        livro.sinopse,
        livro.avaliacao,
        livro.disponivel
    ]);

    return result.insertId;
}

export async function getLivro(id) {
    const command = `
        select id,
               nome,
               genero,
               sinopse,
               avaliacao,
               disponivel
        from livros
        where id = ?
    `;

    const [linhas] = await con.query(command, [id]);
    return linhas[0];
}

export async function listLivros() {
    const command = `
        select id,
               nome,
               genero,
               sinopse,
               avaliacao,
               disponivel
        from livros
    `;

    const [linhas] = await con.query(command, []);
    return linhas;
}

export async function updateLivro(id, livro) {
    const command = `
        update livros
           set nome = ?,
               genero = ?,
               sinopse = ?,
               avaliacao = ?,
               disponivel = ?
         where id = ?
    `;

    const [result] = await con.query(command, [
        livro.nome,
        livro.genero,
        livro.sinopse,
        livro.avaliacao,
        livro.disponivel,
        id
    ]);

    return result.affectedRows;
}

export async function deleteLivro(id) {
    const command = `
        delete from livros
        where id = ?
    `;

    const [result] = await con.query(command, [id]);
    return result.affectedRows;
}