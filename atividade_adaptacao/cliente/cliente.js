import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';


const API_URL = 'http://localhost:3000';


async function listarContatos() {
    try {
        const response = await axios.get(`${API_URL}/contatos`, {
        });
        return response.data;
    } catch (error) {
        console.error(chalk.red('Erro ao listar contatos:'), error);
    }
}

async function exibirDetalhesContatos(id) {
    try {
        const response = await axios.get(`${API_URL}/contatos/${id}`, {
        });
        return response.data;
    } catch (error) {
        console.error(chalk.red(`Erro ao exibir detalhes do contato com id: ${id}`), error.message);
    }
}

async function criarContato() {
    try {
        const resposta = await inquirer.prompt([
            {
                type: 'input',
                name: 'nome',
                message: 'Digite o nome do contato: '
            },
            {
                type: 'input',
                name: 'telefone',
                message: 'Digite o telefone do contato: '
            },
            {
                type: 'input',
                name: 'email',
                message: 'Digite o email do contato: '
            }
        ]);

        const response = await axios.post(`${API_URL}/contatos`, resposta, {
        });

        console.log(chalk.green('Contato criado com sucesso!'), response.data);
    } catch (error) {
        console.error(chalk.red('Erro ao criar contato:'), error.message);
    }
}

async function atualizarContato() {
    try {
        const idResposta = await inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'Digite o id do contato a ser atualizado: '
        }]);

        const resposta = await inquirer.prompt([
            {
                type: 'input',
                name: 'nome',
                message: 'Digite o novo nome do contato: '
            },
            {
                type: 'input',
                name: 'telefone',
                message: 'Digite o novo telefone do contato: '
            },
            {
                type: 'input',
                name: 'email',
                message: 'Digite o novo email do contato: '
            }
        ]);

        const response = await axios.patch(`${API_URL}/contatos/${idResposta.id}`, resposta, {
        });
        console.log(chalk.green('Contato atualizado com sucesso!'), response.data);
    } catch (error) {
        console.error(chalk.red('Erro ao atualizar contato:'), error.message);
    }
}

async function removerContato() {
    try {
        const idResposta = await inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'Digite o id do contato a ser removido: '
        }]);

        await axios.delete(`${API_URL}/contatos/${idResposta.id}`, {
        });
        console.log(chalk.green('Contato removido com sucesso!'));
    } catch (error) {
        console.error(chalk.red('Erro ao remover contato:'), error.message);
    }
}

async function exibirMenu() {
    console.log('\n\n');
    const perguntas = [
        {
            type: 'list',
            name: 'opcao',
            message: chalk.magenta('Escolha uma opção:'),
            choices: [
                {name: 'Listar Contatos ', value: 'listar'},
                {name: 'Exibir detalhes do contato', value: 'exibir'},
                {name: 'Criar Contato', value: 'criar'},
                {name: 'Atualizar Contato', value: 'atualizar'},
                {name: 'Remover Contato', value: 'remover'},
                {name: chalk.redBright('Sair'), value: 'sair'}
            ]
        }
    ];

    try {
        const resposta = await inquirer.prompt(perguntas);

        switch (resposta.opcao) {
            case 'listar':
                const contatos = await listarContatos();

                if (Array.isArray(contatos) && contatos.length > 0) {
                    console.log(chalk.magenta('Lista de contatos: '))
                    contatos.forEach(contato => {
                        console.log(`- ${chalk.cyanBright(contato.id)}: ${chalk.yellowBright(contato.nome)}: ${chalk.blueBright(contato.telefone)}: ${chalk.blueBright(contato.email)} `);    
                    });
                } else {
                    console.log(chalk.red('Nenhum contato encontrado!!!'))
                }

                exibirMenu();
                break;
            case 'exibir':
                const idRespostaExibir = await inquirer.prompt([{
                    type: 'input',
                    name: 'id',
                    message: 'Digite o id do contato: '
                }]);

                const contato = await exibirDetalhesContatos(idRespostaExibir.id);

                if (contato) {
                    console.log(chalk.magenta('Detalhes do contato:'));
                    console.log(`- ${chalk.cyanBright(contato.id)}: ${chalk.yellowBright(contato.nome)}: ${chalk.blueBright(contato.telefone)}: ${chalk.blueBright(contato.email)} `);
                } else {
                    console.log(chalk.red('Contato não encontrado!'));
                }

                exibirMenu();
                break;
            case 'criar':
                await criarContato();
                exibirMenu();
                break;
            case 'atualizar':
                await atualizarContato();
                exibirMenu();
                break;
            case 'remover':
                await removerContato();
                exibirMenu();
                break;
            case 'sair':
                console.log(chalk.red('Saindo do Sistema...'));
                break;
        }

    } catch (error) {
        console.error(chalk.red('Ocorreu um erro'), error);
    }
}

exibirMenu();