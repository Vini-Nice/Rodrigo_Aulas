const axios = require('axios');

axios.request({
    method: options,
    url: 'https://jsonplaceholder.typicode.com/todos/'
})
    .then(response => {
        console.log("Métodos permitidos: ", response.headers.allow);
        console.log("Cabeçalhos; ", response.headers);
    })
    .catch(error => {
        console.log('Ocorreu um erro: ', error);
    });