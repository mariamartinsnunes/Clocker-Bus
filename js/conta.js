//Lauane: MODAL DE FEEDBACK
function showModal(mensagem, callback) {
    const overlay = document.querySelector('#modal-overlay');
    const texto   = document.querySelector('#modal-mensagem');
    const botao   = document.querySelector('#modal-fechar');

    if (!overlay || !texto || !botao){
        console.error('Elementos do modal não encontrados.');
        return;
    }

    texto.textContent = mensagem;
    overlay.classList.add('ativo');

    //remove eventos antigos clonando o botão
    const novoBotao = botao.cloneNode(true);
    botao.parentNode.replaceChild(novoBotao, botao);

    novoBotao.addEventListener('click', function () {
        overlay.classList.remove('ativo');

        if (typeof callback === 'function'){
            callback();
        }
    });
}


//lista de avatares disponíveis
const avatares = [
    '/imagens/avatares/avatar0.png',
    '/imagens/avatares/avatar1.png',
    '/imagens/avatares/avatar2.png',
    '/imagens/avatares/avatar3.png',
    '/imagens/avatares/avatar4.png',
    '/imagens/avatares/avatar5.png',
    '/imagens/avatares/avatar6.png',
    '/imagens/avatares/avatar7.png',
    '/imagens/avatares/avatar8.png',
    '/imagens/avatares/avatar9.png',
    '/imagens/avatares/avatar10.png',
];

//o ideal não é usar variável global - vou mudar isso depois
//deixei assim pq não estava funcionando como deveria sem essa variável
let indexAvatar = 0;


function lerStorage(chave){
    try{
        return JSON.parse(localStorage.getItem(chave));
    } catch {
        return null;
    }
}



//adicionado as informações do usuário logado na página
function exibeDados(){
    const usuarioLogado = lerStorage("usuarioLogado");

    const exibirAvatar = document.querySelector('#exibirAvatar');
    const nomeUsuario = document.querySelector('#nomeUsuario');
    const emailUsuario = document.querySelector('#emailUsuario');

    if(exibirAvatar && nomeUsuario && emailUsuario){

        if(usuarioLogado){

            if(usuarioLogado?.avatar){

                indexAvatar = avatares.indexOf(usuarioLogado.avatar);

                if(indexAvatar === -1){
                    indexAvatar = 0;
                }

                exibirAvatar.src = usuarioLogado.avatar;

            } else {
                exibirAvatar.src = avatares[0];
            }

            nomeUsuario.textContent = usuarioLogado.nome || 'nome';
            emailUsuario.textContent = usuarioLogado.email || 'email';

        } else {

            exibirAvatar.src = avatares[0];

            nomeUsuario.textContent = 'nome';
            emailUsuario.textContent = 'email';
        }
    }
}


//caso o usuário não tenha cadastro, ele deve ter a opção de se cadastrar 
const opcaoCadastro = document.querySelector('#realizarCadastro');
const opcoesPerfil = document.querySelectorAll('.opcaoPerfil');

//se o usuário não estiver cadastrado, ele não terá acesso as funções histórico e itinerário
const abaItinerario = document.querySelector('#abaItinerario');
const abaHistorico = document.querySelector('#abaHistorico');


const usuarioLogado = lerStorage("usuarioLogado");
console.log(usuarioLogado);

if(usuarioLogado){

    if(opcaoCadastro){
        opcaoCadastro.style.display = 'none';
    }

} else {

    if(opcoesPerfil.length > 0){
        opcoesPerfil.forEach(elemento => elemento.style.display = 'none');
    }

    if(opcaoCadastro){
        opcaoCadastro.addEventListener('click', () => {
            window.location.replace('../html/cadastro.html');
        });
    }

    if(abaItinerario){
        abaItinerario.addEventListener('click', (e) => {

            e.preventDefault();

            showModal(
                'Cadastre-se ou faça seu login em "Minha Conta" para acessar aos Itinerários!',
                function() {
                    window.location.replace('/index.html');
                }
            );
        });
    }

    if(abaHistorico){
        abaHistorico.addEventListener('click', (e) => {

            e.preventDefault();

            showModal(
                'Cadastre-se ou faça seu login em "Minha Conta" para acessar ao Histórico!',
                function() {
                    window.location.replace('/index.html');
                }
            );
        });
    }
}


//para editar as informações do perfil

//abre o modal de edição
const editarPerfil = document.querySelector('#editarPerfil');
const modalPerfil = document.querySelector('.modalPerfil');

if(editarPerfil && modalPerfil){

    const modalP = new bootstrap.Modal(modalPerfil);

    editarPerfil.addEventListener('click', (e) => {

        e.preventDefault();

        modalP.show();
    });
}


//adicionar ou atualizar o avatar do usuário
const editarAvatar = document.querySelector('#editarAvatar');

function controlarSetas(){

    const esquerda = document.querySelector('#esquerda');
    const direita = document.querySelector('#direita');

    if(esquerda && direita){

        esquerda.style.display = indexAvatar === 0 ? 'none' : 'block';

        direita.style.display = indexAvatar === avatares.length - 1 ? 'none' : 'block';
    }
}


const setaEsquerda = document.querySelector('#esquerda');
const setaDireita = document.querySelector('#direita');

if(setaEsquerda && setaDireita){

    setaEsquerda.addEventListener('click', () => {

        if(indexAvatar > 0){

            indexAvatar--;

            atualizaAvatar();
        }
    });

    setaDireita.addEventListener('click', () => {

        if(indexAvatar < avatares.length - 1){

            indexAvatar++;

            atualizaAvatar();
        }
    });
}


function atualizaAvatar(){

    if(!avatares[indexAvatar]){
        indexAvatar = 0;
    }

    if(editarAvatar){

        editarAvatar.src = avatares[indexAvatar];

        controlarSetas();
    }
}

exibeDados();
atualizaAvatar();



//para a visualização da senha
function visualizarSenha(){

    document.addEventListener('click', function(e){

        if(e.target.classList.contains('olho-senha')){

            const olho = e.target;

            const campoSenha = olho.parentElement.querySelector('input');

            if(!campoSenha) return;

            if(campoSenha.type === 'password'){

                campoSenha.type = 'text';

                olho.classList.remove('fa-eye');
                olho.classList.add('fa-eye-slash');

            } else {

                campoSenha.type = 'password';

                olho.classList.remove('fa-eye-slash');
                olho.classList.add('fa-eye');
            }
        }
    });
}

visualizarSenha();


//atualiza as informações (nome e/ou senha)
function validacoes(nomePerfil, senhaAtual, novaSenha){  //1
    const usuarioLogado = lerStorage("usuarioLogado");  //1

    let senhaNova = '';  //1
    let novoNome = '';  //1

    if(nomePerfil.value.trim() != ''){  //2

        if(nomePerfil.validity.patternMismatch || nomePerfil.value.length < 3){  //3
            showModal('O nome precisa ter pelo menos 3 caracteres e apenas letras maiusculas ou minusculas');  //4
            return false;  //4
        } 
        
        //seria um else
        novoNome = nomePerfil.value.trim();  //5
    }  //2
    

    if(senhaAtual.value || novaSenha.value){  //6
        if(!senhaAtual.value || !novaSenha.value){  //7  
            showModal('Preencha todos os campos de senha!');  //8
            return false;  //8
        }
        else if(senhaAtual.value !== usuarioLogado.senha){  //else é 9 e if é 10
            showModal('Senha atual incorreta!');  //11
            return false;  //11
        }
        else if(novaSenha.validity.patternMismatch){  //else é 12 e if é 13
            showModal('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, número e símbolo.');  //14
            return false;  //14
        }

        senhaNova = novaSenha.value.trim();  //15
    }  //6

    return {senhaNova, novoNome};  //16
}  //1



//salva as alterações
const salvar = document.querySelector('#salvarPerfil');

if(salvar){

    salvar.addEventListener('click', (e) => {

        e.preventDefault();

        const nomePerfil = document.querySelector('#nomePerfil');
        const senhaAtual = document.querySelector('#senhaAtual');
        const novaSenha = document.querySelector('#senhaNova');

        if(!nomePerfil || !senhaAtual || !novaSenha){
            console.error('Campos do formulário não encontrados.');
            return;
        }

        const valores = validacoes(nomePerfil, senhaAtual, novaSenha);

        // Se retornar false (falhou na validação), interrompe aqui para exibir o showModal
        if(!valores){
            return;
        }

        const {senhaNova, novoNome} = valores;

        const usuariosCadastrados = lerStorage("usuarios") || [];
        const usuarioLogado = lerStorage("usuarioLogado");

        if(!usuarioLogado){
            showModal('Usuário não encontrado.');
            return;
        }

        let index = usuariosCadastrados.findIndex(
            usuario => usuario.email === usuarioLogado.email
        );

        //o site pode travar sem essa validação
        if(index === -1){

            showModal('Erro: usuário não encontrado. Tente fazer o login novamente');

            return;
        }


        if(novoNome !== ''){

            usuarioLogado.nome = novoNome;

            usuariosCadastrados[index].nome = novoNome;
        }

        if(senhaNova !== ''){

            usuarioLogado.senha = senhaNova;

            usuariosCadastrados[index].senha = senhaNova;
        }

        usuarioLogado.avatar = avatares[indexAvatar];
        usuariosCadastrados[index].avatar = avatares[indexAvatar];

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuariosCadastrados)
        );

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioLogado)
        );

        // add agora
        const modalPerfil = document.querySelector('.modalPerfil');

        if(modalPerfil){
            bootstrap.Modal.getInstance(modalPerfil)?.hide();
        }

        showModal('Atualização realizada com sucesso!');

        exibeDados();

        nomePerfil.value = '';
        senhaAtual.value = '';
        novaSenha.value = '';
    });
}


//saindo da conta
document.addEventListener('click', function(e) {

    // Procura se o clique foi no botão de sair (ou dentro dele)
    const botaoSair = e.target.closest('#sairLogin');

    if(botaoSair){

        e.preventDefault();

        const loading = document.getElementById('loadingLogout');
        const progresso = document.querySelector('.progresso');

        if(!loading || !progresso){

            console.log('Elementos de animação não encontrados no HTML.');

            return;
        }

        // Exibe o loading overlay
        loading.style.display = 'flex';

        // Reinicia a animação CSS
        progresso.classList.remove('animar');

        void progresso.offsetWidth;

        // Truque para forçar o browser a resetar a animação
        progresso.classList.add('animar');

        // Aguarda os 4 segundos da barra antes de deslogar
        setTimeout(() => {

            localStorage.removeItem("usuarioLogado");

            window.location.href = "../index.html";

        }, 4000);
    }
});


// --------------------------------------------------------------------------------------

// PARA OS TESTES USANDO JEST
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validacoes,
        visualizarSenha,
    };
}