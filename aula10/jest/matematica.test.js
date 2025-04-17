const {somar, dividir} = require('./matematica.js');

describe("Função Somar: ", () => {

    //test
    it('deve somar dois números corretamente', () => {
        expect(somar(2,3)).toBe(5);
    })

    //test
    it('deve somar numeros positivos e negativos corretamente', () => {
        expect(somar(-2,3)).toBe(1);
    })

    //test
    it('deve somar numeros negativos corretamente', () => {
        expect(somar(-2,-3)).toBe(-5);
    })

    describe("Função Dividir: ", () => {
        it('deve dividir dois números positivos corretamente', () => {
            expect(dividir(10,2)).toBe(5);
        })
    })
})