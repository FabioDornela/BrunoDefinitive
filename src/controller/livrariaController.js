import { Router } from 'express';
import { 
    saveLivro, 
    getLivro, 
    listLivros, 
    updateLivro, 
    deleteLivro 
} from '../repository/livrariaRepository.js';

const endpoint = Router();


endpoint.post('/livros', async (req, resp) => {
    try {
        const livro = req.body;
        const id = await saveLivro(livro);
        resp.send({ id: id });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});


endpoint.get('/livros', async (req, resp) => {
    try {
        const livros = await listLivros();
        resp.send(livros);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});


endpoint.get('/livros/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const livro = await getLivro(id);
        
        if (!livro) {
            return resp.status(404).send({ erro: 'Livro não encontrado.' });
        }
        
        resp.send(livro);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});


endpoint.put('/livros/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const livro = req.body;
        
        const linhasAfetadas = await updateLivro(id, livro);
        
        if (linhasAfetadas === 0) {
            return resp.status(404).send({ erro: 'Livro não encontrado para atualizar.' });
        }
        
        resp.send();
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});


endpoint.delete('/livros/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const linhasAfetadas = await deleteLivro(id);
        
        if (linhasAfetadas === 0) {
            return resp.status(404).send({ erro: 'Livro não encontrado para remover.' });
        }
        
        resp.send();
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

export default endpoint;