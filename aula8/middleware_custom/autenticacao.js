const express = require('express');
const app = express();
const port = 3000;

const autenticar = (req, res, next) => {
    // Simulação de autenticação: Nunca usar em produção!!!
    const token = req.headers['authorization'];
    if (token === 'SEGREDO') {
        next(); // SE AUTENTICADO
    } else {
        res.status(401).send('Acesso Negado/Não Autorizado');
}
};

app.get('/admin', autenticar, (req,res) => {
    res.status(200).send('Página de administração');
});

app.get('/', (req, res) =>{
    res.status(200).send('<h1>Página Inicial</h1>')
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

