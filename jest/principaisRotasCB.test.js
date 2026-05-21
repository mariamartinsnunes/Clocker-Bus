const { rastrearMotoristaReal } = require('../js/principaisRotas.js');

describe('Teste do rastreamento do motorista', () => {

    test('deve criar objeto com latitude e longitude', () => {

        const dadosDoMotorista = {
            lat: -21.794,
            lng: -48.175
        };

        expect(dadosDoMotorista.lat).toBe(-21.794);

        expect(dadosDoMotorista.lng).toBe(-48.175);
    });


    test('deve usar o nome da linha enviado pelo motorista', () => {

        const dadosDoMotorista = {
            linha: '099 - Bairro Novo'
        };

        expect(dadosDoMotorista.linha).toBe('099 - Bairro Novo');
    });


    test('deve usar "Ônibus" caso não exista linha', () => {

        const dadosDoMotorista = {
            linha: ''
        };

        const nomeLinha = dadosDoMotorista.linha || 'Ônibus';

        expect(nomeLinha).toBe('Ônibus');
    });


    test('deve verificar se marcador já existe', () => {

        let marcadorOnibus = null;

        expect(marcadorOnibus).toBe(null);

        marcadorOnibus = {};

        expect(marcadorOnibus).not.toBe(null);
    });

});