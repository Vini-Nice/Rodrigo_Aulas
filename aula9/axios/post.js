const axios = require('axios');

axios.post('https://jsonplaceholder.typicode.com/todos', {
    userId:1,
    title: "Comprar pão",
    completed: false
})
.then(response => {
    console.log('Novo todo criado: ', response.data);
})
.catch(error => {
    console.log('Ocorreu um erro: ', error);
});