const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const produtos = ([
    [1, { id: 1, nome: 'Produto 1' }],
    [2, { id: 2, nome: 'Produto 2' }],
    [3, { id: 3, nome: 'Produto 3' }]
]);

app.get('/', (req, res) => {
    res.send('Pagina principal');
});

app.get('/produtos', (req, res) => {
    res.send('Lista de produtos');
});

app.get('/produtos/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = produtos.find(([id]) => id === productId);
    
    if (product) {
        res.json(product[1]);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.post('/contato', (req, res) => {
   console.log(req.body);
    res.send('Contato enviado');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
