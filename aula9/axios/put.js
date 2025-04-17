const axios = require('axios');

axios.put('https://jsonplaceholder.typicode.com/todos/1', {
    userId:1,
    title: "Comprar Pão de Queijo",
    completed: true
})
.then(response => {
    console.log('ToDo atualizado: ', response.data);
})
.catch(error => {
    console.log('Ocorreu um erro: ', error);
});