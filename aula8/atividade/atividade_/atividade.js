const express = require('express');
const app = express();
const rotaProdutos = require('./produtos');
const rotaAdmin = require('./admin');
const rotaUsuarios = require('./usuarios');

const port = 3000;

app.use('/produtos', rotaProdutos);
app.use('/admin', rotaAdmin);
app.use('/usuarios' , rotaUsuarios);

const logger = (req, res, next) => {
    const data = new Date();
    console.log(`[${data.toISOString()}] ${req.method} ${req.url}`);
    next();
};

app.use(logger);



app.get('/', (req, res) =>{
    res.status(200).send('<h1 style="color:red"; text-align: center>Página Inicial</h1>')
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})