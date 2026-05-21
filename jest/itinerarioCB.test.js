const { selecionarItinerario } = require('../js/itinerarios.js'); 

describe('Teste selecionarItinerario', () => {

    beforeEach(() => {

        document.body.innerHTML = `

            <div id="modalItinerario"></div>

            <div class="item-modal selecionado">
                <button id="btn1"></button>
            </div>

            <div class="item-modal">
                <button id="btn2"></button>
            </div>

        `;
    });


    test('deve adicionar classe selecionado no item clicado', () => {

        const botao = document.querySelector('#btn2');

        selecionarItinerario(botao, 2);

        const item = botao.closest('.item-modal');

        expect(item.classList.contains('selecionado')).toBe(true);
    });


    test('deve remover selecionado dos outros itens', () => {

        const botao = document.querySelector('#btn2');

        selecionarItinerario(botao, 2);

        const itens = document.querySelectorAll('.item-modal');

        expect(itens[0].classList.contains('selecionado')).toBe(false);
    });


    test('deve salvar id do itinerário no modal', () => {

        const botao = document.querySelector('#btn2');

        selecionarItinerario(botao, 2);

        const modal = document.querySelector('#modalItinerario');

        expect(modal.dataset.itinerarioSelecionado).toBe('2');
    });

});