const express = require('express');
const app = express();
const rotasUsuarios = require('./rotasUsuarios');
const rotasProdutos = require('./rotasProdutos');

const port = 3000;

app.use('/usuarios', rotasUsuarios);
app.use('/produtos', rotasProdutos);


app.get('/', (req, res) => {
    res.status(200).send('<h1>Página Inicial </h1>');
});

app.listen(port, ()=>{
    console.log(`servidor rodando em http://localhost:${port}`);
})