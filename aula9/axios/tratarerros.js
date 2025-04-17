const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/todos/888')
    .then(response => {
        console.log('Dados recebidos: ', response.data);
    })
    .catch(error => {
        console.log("Mensagem de Erro: ", error.message);
        console.log("Código de status: ", error.response.status);
        console.log('Mensagem de Status: ', error.response.statusText);
    })