const buscarDados = require('./funcaoAssincrona');

describe('Função Buscar Dados: ', () => {

    //test 
    it('deve retornar os dados corretamente', () => {
        return buscarDados()
        .then(data => {
            expect(data).toBedefined();
            expect(data.userId).toBe(1);
    })
})

})