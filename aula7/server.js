const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.options('/produtos/:id', (req, res) => {
    res.header('Allow', 'GET, OPTIONS');
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('<h1>Página Inicial</h1>')
});

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do usuário com ID: ${id}`);
});

app.get('/categorias/:categoria/produtos/:produtoId', (req, res) => {
    const categoria = req.params.categoria;
    const produtoId = req.params.produtoId;
    res.send(`Categoria: ${categoria} e Produto: ${produtoId}`);
});


app.get('/categorias/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    res.send(`Categoria: ${ categoria }`)
})

app.get('/produtos/:produtoId', (req, res) => {
    const produtoId = req.params.produtoId;
    res.send(`Produto: ${ produtoId }`)
})

app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    console.log('Novo Produto:', novoProduto);
    res.send('Produto criado com sucesso!');
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

