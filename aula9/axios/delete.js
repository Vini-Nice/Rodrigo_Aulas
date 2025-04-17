const axios = require('axios');

axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
        console.log('ToDo deletado: ');
    })
    .catch(error => {
        console.log('Ocorreu um erro: ', error);
    })