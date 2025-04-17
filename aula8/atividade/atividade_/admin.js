const express = require('express');
const router = express.Router();


const autenticar = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'SEGREDO') {
        next();
    } else {
        res.status(401).send('Acesso Negado');
    }
};

router.get('/', autenticar,  (req, res) => {
    res.status(200).send('Página de administração');
});

router.options('/', (req, res) => {
    res.header('Allow', 'GET, OPTIONS');
    res.status(204).send();
});

module.exports = router;