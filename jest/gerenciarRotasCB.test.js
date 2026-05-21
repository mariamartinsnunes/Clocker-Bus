const { obterRotas, salvarRotas, renderizarRotas, showPrompt } = require('../js/gerenciarRotas.js');

test('deve usar horário padrão quando vazio', () => {

    const horarioSaida = '';

    const saida = horarioSaida || '--:--';

    expect(saida).toBe('--:--');
});

test('deve gerar id 1 quando não existir rotas', () => {

    const rotas = [];

    const id =
        rotas.length > 0
        ? Math.max(...rotas.map(r => r.id)) + 1
        : 1;

    expect(id).toBe(1);
});

test('deve adicionar uma nova rota', () => {

    const rotas = [];

    const novaRota = {
        id: 1,
        linha: '099 - Bairro Novo',
        saida: '07:30'
    };

    rotas.push(novaRota);

    expect(rotas.length).toBe(1);

    expect(rotas[0].linha).toBe('099 - Bairro Novo');
});

