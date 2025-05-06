import express from 'express'
import { listarLivrosController, obterLivroPorIdController } from '../controllers/LivroController.js'

const router = express.Router();

router.get('/', listarLivrosController);
router.get('/:id', obterLivroPorIdController);

export default router