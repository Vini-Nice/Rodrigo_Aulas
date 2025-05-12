

const express = require('express')
const fs = require('fs')
const app = express();
const port = 3000;
const db = require('./db')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center;">Página Inicial</h1>');
});

app.get('/contatos', async (req,res )=> {
    try {
        const [rows] = await db.query('SELECT * FROM contatos');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar clientes')
    }
});

app.get('/contatos/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM  contatos WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Contato não encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao obter contato')
    }
});

app.post('/contatos', async (req, res) => {
    const {nome, telefone, email} = req.body;
    try {
        const [result] = await db.query('INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)', [nome, telefone, email]);
        res.status(201).json({ id: result.insertId, nome, telefone, email});
    } catch (err) {
        console.error(err);
        console.error(err);
        res.status(500).send('Erro ao criar contato');
    }
});

app.put('/contatos/:id', async (req,res) => {
    const {id} = req.params;
    const {nome, telefone, email} = req.body;
    try {
        const [result] = await db.query('UPDATE contatos SET nome = ?, telefone = ?, email = ? WHERE id = ?', [nome, telefone, email, id]);
        if (result.affectedRows > 0) {
            res.status(201).json({ id, nome, telefone, email});
        } else {
            res.status(404).send('Contato não encontrado')
        } 
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar contato')
    }
});

app.delete('/contatos/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await db.query('DELETE FROM contatos WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).send('Contato deletado com sucesso');
        } else {
            res.status(404).send('Contato não encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir contato');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
