const { visualizarSenha } = require('../js/cadastro.js');

describe('Testes de visualizarSenha', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="campo-senha">
                <input type="password" id="senha" />
                <i class="olho-senha fa fa-eye"></i>
            </div>
            <div class="campo-senha">
                <input type="password" id="confirmarSenha" />
                <i class="olho-senha fa fa-eye"></i>
            </div>
        `;
        visualizarSenha();
    });

    test('deve trocar o tipo do input de "password" para "text" ao clicar no ícone', () => {
        const olho = document.querySelector('.olho-senha');
        const campoSenha = olho.parentElement.querySelector('input');

        expect(campoSenha.type).toBe('password');

        olho.click();

        expect(campoSenha.type).toBe('text');
    });

    test('deve trocar o tipo do input de "text" de volta para "password" ao clicar novamente', () => {
        const olho = document.querySelector('.olho-senha');
        const campoSenha = olho.parentElement.querySelector('input');

        olho.click(); // password → text
        olho.click(); // text → password

        expect(campoSenha.type).toBe('password');
    });

    test('deve remover a classe "fa-eye" e adicionar "fa-eye-slash" ao mostrar a senha', () => {
        const olho = document.querySelector('.olho-senha');

        expect(olho.classList.contains('fa-eye')).toBe(true);
        expect(olho.classList.contains('fa-eye-slash')).toBe(false);

        olho.click();

        expect(olho.classList.contains('fa-eye')).toBe(false);
        expect(olho.classList.contains('fa-eye-slash')).toBe(true);
    });

    test('deve remover a classe "fa-eye-slash" e adicionar "fa-eye" ao ocultar a senha', () => {
        const olho = document.querySelector('.olho-senha');

        olho.click(); // mostra → fa-eye-slash
        olho.click(); // oculta → fa-eye

        expect(olho.classList.contains('fa-eye-slash')).toBe(false);
        expect(olho.classList.contains('fa-eye')).toBe(true);
    });

    test('deve funcionar independentemente para cada campo de senha', () => {
        const olhos = document.querySelectorAll('.olho-senha');
        const primeiroInput = olhos[0].parentElement.querySelector('input');
        const segundoInput = olhos[1].parentElement.querySelector('input');

        olhos[0].click(); // só o primeiro

        expect(primeiroInput.type).toBe('text');
        expect(segundoInput.type).toBe('password'); // segundo não muda
    });

    test('não deve quebrar se não houver elementos ".olho-senha" na página', () => {
        document.body.innerHTML = ''; // página sem nenhum ícone
        expect(() => visualizarSenha()).not.toThrow();
    });
});