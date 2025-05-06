import { listarLivros, obterLivroPorId} from "../models/Livro.js";

const listarLivrosController = async (req, res) =>{
    try {
        const livros = await listarLivros();
        res.status(200).json(livros);
    } catch (err) {
        console.error('Erro ao listar livros: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar livros'});
    }
}

const obterLivroPorIdController = async (req, res) =>{
    try {
        const livro = await obterLivroPorId(req.params.id);
        if (livro) {
            res.status(200).json(livro);
        } else {
            res.status(404).json({mensagem: 'Livro não encontrado'});
        }
    } catch (err) {
        console.error('Erro ao obter livro por ID: ', err);
        res.status(500).json({mensagem: 'Erro ao obter livro por ID'});
    }
}

export { listarLivrosController, obterLivroPorIdController }