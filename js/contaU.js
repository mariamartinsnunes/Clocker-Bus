//melhorar os feedbacks depois (todos os alerts)

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

let indexAvatar = 0;


//adicionado as informações do usuário logado na página

function exibeInformacoes(){
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
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
            }   

            nomeUsuario.textContent = usuarioLogado.nome;
            emailUsuario.textContent = usuarioLogado.email;

        } else {
            exibirAvatar.src = avatares[0];

            nomeUsuario.textContent = 'nome';
            emailUsuario.textContent = 'email';
        }
    }
}



//caso o usuário não tenha cadastro, ele deve ter a opção de se cadastrar 
//se o usuário não estiver cadastrado, ele não terá acesso as funções histórico e itinerário

function verificaExistenciaUsuario(){
    const opcaoCadastro = document.querySelector('#realizarCadastro');
    const opcoesPerfil = document.querySelectorAll('.opcaoPerfil');

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

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


        const abaItinerario = document.querySelector('#abaItinerario');
        const abaHistorico = document.querySelector('#abaHistorico');

        if(abaItinerario && abaHistorico){
            abaItinerario.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Cadastre-se ou faça seu login para acessar a aba Itinerários!');
                window.location.replace('/index.html');
            });

            abaHistorico.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Cadastre-se ou faça seu login para acessar a aba Histórico!');
                window.location.replace('/index.html');
            });
        }
    }
}

verificaExistenciaUsuario();



//para editar as informações do perfil

//abre o modal de edição
function modalEditar(){
    const editarPerfil = document.querySelector('#editarPerfil');
    const modalPerfil = document.querySelector('.modalPerfil');

    if(editarPerfil && modalPerfil){
        const modalP = new bootstrap.Modal(modalPerfil);

        editarPerfil.addEventListener('click', (e) => {
            e.preventDefault();
            modalP.show();
        });
    }
}


//adicionar ou atualizar o avatar do usuário

function controlarSetas(){
    const setaEsquerda = document.querySelector('#esquerda');
    const setaDireita = document.querySelector('#direita');

    if(setaEsquerda && setaDireita){
        setaEsquerda.style.display = indexAvatar === 0 ? 'none' : 'block';
        setaDireita.style.display = indexAvatar === avatares.length - 1 ? 'none' : 'block';
    }

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
}


function atualizaAvatar(){
    const editarAvatar = document.querySelector('#editarAvatar');

    if(!avatares[indexAvatar]){
        indexAvatar = 0;
    }

    if(editarAvatar){
        editarAvatar.src = avatares[indexAvatar];
        controlarSetas();
    }
}


exibeInformacoes();
atualizaAvatar();
modalEditar();


//atualiza as informações (nome e/ou senha)
function validacoes(nomePerfil, senhaAtual, novaSenha){
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    let senhaNova = '';
    let novoNome = '';
    
    if(nomePerfil.value.trim() != ''){
        if(nomePerfil.validity.patternMismatch){
            alert('Use apenas letras maiusculas ou minusculas no campo nome');
            return false;
        } 
        
        novoNome = nomePerfil.value.trim();
    }
    

    if(senhaAtual.value || novaSenha.value){
        if(!senhaAtual.value || !novaSenha.value){
            alert('Preencha todos os campos de senha!');
            return false;
        }

        if(senhaAtual.value !== usuarioLogado.senha){
            alert('Senha atual incorreta!');
            return false;
        }

        if(novaSenha.validity.patternMismatch){
            alert('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, número e símbolo.'); 
            return false;
        }

        senhaNova = novaSenha.value.trim(); 
    }

    return {novoNome, senhaNova};
}


//salva as alterações
const salvar = document.querySelector('#salvarPerfil');

if(salvar){
    salvar.addEventListener('click', (e) => {
        e.preventDefault();

        const nomePerfil = document.querySelector('#nomePerfil');
        const senhaAtual = document.querySelector('#senhaAtual');
        const novaSenha = document.querySelector('#senhaNova');


        const valores = validacoes(nomePerfil, senhaAtual, novaSenha);

        if(valores){
            const {novoNome, senhaNova} = valores;

            const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

            let index = usuariosCadastrados.findIndex(usuario => usuario.email === usuarioLogado.email);
            
            if(novoNome !== ''){
                usuarioLogado.nome = novoNome;
                usuariosCadastrados[index].nome = novoNome;
            }

            if(senhaNova != ''){
                usuarioLogado.senha = senhaNova;
                usuariosCadastrados[index].senha = senhaNova;
            }

            usuarioLogado.avatar = avatares[indexAvatar];
            usuariosCadastrados[index].avatar = avatares[indexAvatar];

            localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

            alert('Atualização realizada com sucesso!');

            exibeInformacoes();
        }
                
        nomePerfil.value = '';
        senhaAtual.value = '';
        novaSenha.value = '';
    });
}


//saindo da conta
const sair = document.querySelector('#sairLogin');

if(sair){
    sair.addEventListener('click', () => {
        localStorage.removeItem("usuarioLogado");
        alert('Saindo...');
        window.location.replace('../index.html');
    }); 
}









