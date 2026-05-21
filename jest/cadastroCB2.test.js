const { showModal } = require('../js/cadastro.js');


describe('Teste showModal', () => {

    beforeEach(() => {

        document.body.innerHTML = `

            <div id="modal-overlay">

                <p id="modal-mensagem"></p>

                <button id="modal-fechar">
                    Fechar
                </button>

            </div>

        `;
    });


    test('deve mostrar a mensagem no modal', () => {

        showModal('Teste de mensagem');

        const mensagem =
            document.querySelector('#modal-mensagem');

        expect(mensagem.textContent)
            .toBe('Teste de mensagem');
    });


    test('deve adicionar a classe ativo no modal', () => {

        showModal('Teste');

        const overlay =
            document.querySelector('#modal-overlay');

        expect(overlay.classList.contains('ativo'))
            .toBe(true);
    });


    test('deve remover a classe ativo ao clicar no botão fechar', () => {

        showModal('Teste');

        const botao =
            document.querySelector('#modal-fechar');

        const overlay =
            document.querySelector('#modal-overlay');

        botao.click();

        expect(overlay.classList.contains('ativo'))
            .toBe(false);
    });


    test('deve executar callback ao fechar modal', () => {

        let mensagem = '';

        showModal('Teste', function () {
            mensagem = 'Modal fechado';
        });

        const botao =
            document.querySelector('#modal-fechar');

        botao.click();

        expect(mensagem)
            .toBe('Modal fechado');
    });

});