import express from 'express'

const app = express();
const port = 3000;

import livroRotas from './routes/livroRotas.js'

app.use('/livros', livroRotas)

app.get('/', (req,res) => {
    res.status(200).send('API de Biblioteca');
});

app.options('/', (req,res ) =>{
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send()
})

app.use((req,res) =>{
    res.status(404).json({mensagem: 'Rota não encontrada' });
});

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
});