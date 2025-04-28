

import express from 'express'
import fs from 'fs'
const app = express();
const port = 3000;
const db = require('./db')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function salvarLog(acao, detalhe = '') {
    const timestamp = new Date().toISOString();
    const registrar = `[${timestamp}] ${acao}: ${detalhe}\n`;

    console.log(registrar.trim());

    fs.appendFileSync('log.txt', registrar);
}

function salvar() {
    try {
        fs.writeFileSync('contatos.json', JSON.stringify(contatos, null, 2));
    } catch (error) {
        console.error('Erro ao salvar no arquivo contatos.json:', error);
    }
}

let contatos = [];
try {
    const data = fs.readFileSync('contatos.json', 'utf8');
    contatos = JSON.parse(data);
} catch (error) {
    console.log('Erro ao ler o arquivo contatos.json:', error);
    contatos = [];
}

const autenticar = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Acesso Não Autorizado: Cabeçalho de Autorização ausente');
    }

    const token = authHeader.split(' ')[1];  
    if (token === '123') {
        next();  
    } else {
        res.status(401).send('Acesso Não Autorizado: Token inválido');
    }
};


app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center;">Página Inicial</h1>');
});

app.get('/contatos', (req, res) => {
    res.status(200).send(contatos);
});

app.get('/contatos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contato = contatos.find(p => p.id === id);

    if (contato) {
        res.status(200).send(contato);
    } else {
        res.status(404).send('Contato não encontrado');
    }
});

app.post('/contatos', autenticar, (req, res) => {
    const novoContato = req.body;
    novoContato.id = contatos.length > 0 ? contatos[contatos.length - 1].id + 1 : 1;
    contatos.push(novoContato);
    salvar();
    console.log('Contato salvo', novoContato)
    res.status(201).json(novoContato);
});

app.patch('/contatos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contatoIndex = contatos.findIndex(p => p.id === id);

    if (contatoIndex !== -1) {
        contatos[contatoIndex] = { ...contatos[contatoIndex], ...req.body };
        fs.writeFileSync('contatos.json', JSON.stringify(contatos, null, 2));
        res.status(200).send(contatos[contatoIndex]);
    } else {
        res.status(404).send('Contato não encontrado');
    }
});

app.delete('/contatos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contatoIndex = contatos.findIndex(p => p.id === id);

    if (contatoIndex !== -1) {
        contatos.splice(contatoIndex, 1);
        fs.writeFileSync('contatos.json', JSON.stringify(contatos, null, 2));
        res.status(204).send();
    } else {
        res.status(404).send('Contato não encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
