import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

const API_URL = 'http://localhost:3000';

async function listarProdutos() {
    try {
        const response = await axios.get(`${API_URL}/produtos`);
        return response.data;
    } catch (error) {
        console.error(chalk.red('Erro ao listar produtos: '), error.message);
    }
}

async function exibirDetalhesProduto(id) {
    try {
        const response = await axios.get(`${API_URL}/produtos/${id}`);
        return response.data;
    } catch (error) {
        console.error(chalk.red(`Erro ao exibir detalhes do produto com ID: ${id}`), error.message);
        return null;
    }
}

async function exibirMenu() {
    console.log('\n\n');
    const perguntas = [
        {
            type: 'list',
            name: 'opcao',
            message: chalk.yellow('Escolha uma opção:'),
            choices: [
                {name: chalk.blue('Listar Produtos'), value: 'listar'},
                {name: chalk.blue('Exibir Detalhes do produto'), value: 'exibir'},
                {name: chalk.red('Sair'), value: 'sair'}
            ]
        }
    ];

    try {
        const resposta = await inquirer.prompt(perguntas);

        switch (resposta.opcao) {
            case 'listar':
                const produtos = await listarProdutos();


                if(Array.isArray && produtos.length > 0) {
                    console.log(chalk.magenta('Lista de produtos: '))
                    produtos.forEach(produto => {
                        console.log(`- ${chalk.cyan(produto.id)}: ${chalk.yellow(produto.nome)} - R$ ${chalk.red(produto.preco)}`);
                    });
                } else {
                    console.log(chalk.red('Nenhum produto encontrado!'));
                }

                exibirMenu();
                break;
            case 'exibir':
                const idResposta = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: chalk.blue('Digite o ID do produto:')
                    }
                ]);

                const produto = await exibirDetalhesProduto(idResposta.id);

                if (produto) {
                    console.log(chalk.redBright('Detalhes do produto: '));
                    console.log(`- ${chalk.cyan(produto.id)}: ${chalk.yellow(produto.nome)} - R$ ${chalk.red(produto.preco)}`);
                } else {
                    console.log(chalk.red('Produto não encontrado!'));
                }

                exibirMenu();
                break;
            case 'sair':
                console.log(chalk.redBright('Saindo do Sistema...'));
                break;
        }

    } catch (error) {
        console.error(chalk.red('Ocorreu um erro inesperado'), error);
    }
}

exibirMenu();


