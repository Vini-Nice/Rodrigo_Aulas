const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Lista de produtos')
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalhes do produto com ID: ${id}`);
});

router.options('/', (req, res) => {
    res.header('Allow', 'GET, OPTIONS');
    res.status(204).send();
});

module.exports = router;