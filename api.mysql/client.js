import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

const API_URL = 'http://localhost:3000/animais';


// Listar 

async function listarAnimais() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(chalk.red(`Erro ao listar os animais de estimação.`), error.message);
    }
};


// Exibir 

async function exibirDataAnimal(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error){
        console.error(chalk.red('Erro ao exibir detalhes do animal de estimação com seu ID'), id, error.message);
        return null;
    }
};


// Criar 

async function criarAnimal() {
    const novoAnimal = await inquirer.prompt([
        { type: 'input', name: 'tipo', message: chalk.blue('Digite o tipo de animal de estimação.')},
        { type: 'input', name: 'raca', message: chalk.blue('Digite a raca do animal de estimação.')},
        { type: 'input', name: 'nome', message: chalk.blue('Digite o nome do animal de estimação.')},
        { type: 'input', name: 'cuidadosecaracteristicas', message: chalk.blue('Digite os cuidados e caracteristicas do animal de estimação.')},
    ]);

    try {
      const resultado = await axios.post(API_URL, novoAnimal);
      console.log(chalk.green('Animal de estimação criado com sucesso!'), resultado.data);
} catch(error) {
    if (error.response) {
        console.error(chalk.red('Erro ao criar animal de estimação: ', error.response.data.message));
    } else if (error.request) {
        console.error(chalk.red('Erro: Nenhums resposta recebida da API.'));
    } else {
        console.error(chalk.red('Erro ao configurar a solicitacao: ', error.message));
    }
}

};



// Atualizar 


async function atualizarAnimal(id) {
    const atualizacoes = await inquirer.prompt([
      { type: 'input', name: 'tipo', message: chalk.blue('Digite o novo tipo do animal de estimação: ') },
      { type: 'input', name: 'raca', message: chalk.blue('Digite a nova raça do animal de estimação: ') },
      { type: 'input', name: 'nome', message: chalk.blue('Digite o novo nome do animal de estimação: ') },
      { type: 'input', name: 'cuidadosecaracteristicas', message: chalk.blue('Digite os novos Cuidados e Características: ') },
    ]);
  
    try {
      const resposta = await axios.put(`${API_URL}/${id}`, atualizacoes);
      if (resposta.status === 200) {
        console.log(chalk.green('Animal de estimação atualizado com sucesso!'));
      }
    } catch (error) {
      console.error(chalk.red('Erro ao atualizar animal de estimação: ', error.message));
    }
  };

  




// Remover

async function removerAnimal(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log(chalk.green(`Animal de estimação com ID ${id} removido com sucesso!`));
    } catch (error) {
      console.error(chalk.red(`Erro ao remover animal de estimação com ID ${id}:`), error.message);
    }
  };


async function exibirMenu() {
    do {
        const perguntas = [
            {
                type: 'list',
                name: 'opcao',
                message: chalk.yellow('Escolha uma opção: '),
                choices: [
                    { name: chalk.green('Listar animais'), value: 'listar'},
                    { name: chalk.green('Ver detalhes do animal por ID: '), value: 'exibir'},
                    { name: chalk.green('Criar animal'), value: 'criar'},
                    { name: chalk.green('Atualizar animal'), value: 'atualizar'},
                    { name: chalk.green('Remover animal'), value: 'remover'},
                    { name: chalk.green('Sair'), value: 'sair'},

                ]

            }
        ];

        try {
            const resposta = await inquirer.prompt(perguntas);

            switch (resposta.opcao) {



                case 'listar': 
                const animais = await listarAnimais();
                if (Array.isArray(animais) && animais.length > 0) {
                    console.log(chalk.green('Lista de animais: '));
                    animais.forEach(animal => {
                        console.log(`\nID:${animal.id}\nRaça:${animal.raca}\nNome: ${animal.nome}\nCuidados e Características: ${animal.cuidadosecaracteristicas}\n`)
                    });
                } else {
                  console.log(chalk.yellow('Nenhum animal de estimação encontrado.'));
                }
                break;





                case 'exibir':
                    const iDresposta = await inquirer.prompt({
                        type: 'input',
                        name: 'id',
                        message: chalk.blue('Digite o ID do animal de estimação: ')
                    });

                    const idExibir = parseInt(iDresposta.id, 10);
                    if (isNaN(idExibir) || idExibir <= 0 ) {
                        console.log(chalk.red('ID deve ser um numero positivo.'));
                        break;
                    }

                    const animal = await exibirDataAnimal(idExibir);
                    if (animal) {
                        console.log(chalk.green(`Animal encontrado:\n Raça: ${animal.raca}\nNome: ${animal.nome}\nCuidados e Características: ${animal.cuidadosecaracteristicas}\n`))
                    } else {
                        console.log(chalk.yellow('Animal não encontrado.'));
                    }
                    break;






                    case 'criar': 
                    await criarAnimal();
                    break;



              

                    case 'atualizar': 
                    const idAtualizar = await inquirer.prompt({
                      type: 'input',
                      name: 'id',
                      message: chalk.blue('Digite o ID do animal para atualizar:')
                    });
                  
                    const idAtualizarNum = parseInt(idAtualizar.id, 10);
                  
                    if (isNaN(idAtualizarNum) || idAtualizarNum <= 0) {
                      console.log(chalk.red('ID deve ser um número positivo.'));
                      break;
                    }
                  
                    await atualizarAnimal(idAtualizarNum);
                    break;
                  



                    case 'remover':
                        const idRemover = await inquirer.prompt({ type: 'input', name: 'id', message: chalk.blue('Digite o ID do animal para remover: ') });
                        const idRemoverNum = parseInt(idRemover.id, 10);
                        if (isNaN(idRemoverNum) || idRemoverNum <= 0) {
                            console.log(chalk.red('ID deve ser um número positivo.'));
                            break;
                        }
                        await removerAnimal(idRemoverNum);
                        break;





                        case 'sair': 
                        console.log(chalk.blue('Saindo do sistema...'));
                        return;

                        default:
                            console.log(chalk.red('Opção não é valida.'));
                }

            } catch (error) {
                console.error(chalk.red('Ocorreu um erro inesperado: '), error.message);
            }
        } while (true);
    }

    exibirMenu();




 