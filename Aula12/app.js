const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Página inicial');
});

app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar clientes');
    }
});

app.get('/clientes/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao obter cliente')
    }
});

app.post('/clientes', async (req, res) => {
    const {nome, email, endereco } = req.body;
    try {
        const [result] = await db.query('INSERT INTO clientes (nome, email, endereco) VALUES (?, ?, ?)', [nome, email, endereco]);
        res.status(201).json({ id: result.insertId, nome, email, endereco });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar cliente');
    }
});

app.put('/clientes/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, email, endereco} = req.body;
    try {
        const [result] = await db.query('UPDATE clientes SET nome = ?, email = ?, endereco = ? WHERE id = ?', [nome, email, endereco, id]);
        if (result.affectedRows > 0) {
            res.status(201).json({ id, nome, email, endereco});
        } else {
            res.status(404).send('Cliente não encontrado')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar cliente')
    }
});

app.delete('clientes/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).send('Cliente deletado com sucesso');
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir cliente');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});