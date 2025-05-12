import express from 'express'
import cors from 'cors'

const app = express();
const port = 3000;

import livroRotas from './routes/livroRotas.js';
import authRotas from './routes/authRotas.js';

app.use(cors());
app.use(express.json());
app.use('/livros', livroRotas)
app.use('/auth', authRotas);

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