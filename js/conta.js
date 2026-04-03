//melhorar os feedbacks depois (todos os alerts)


//adicionado as informações do usuário logado na página

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
console.log(usuarioLogado);


function exibeInformacoes(){
    const nomeUsuario = document.querySelector('#nomeUsuario');
    const emailUsuario = document.querySelector('#emailUsuario');

    let emailPerfil;

    if(nomeUsuario && emailUsuario){
        if(usuarioLogado){
            nomeUsuario.textContent = usuarioLogado.nome;
            emailUsuario.textContent = usuarioLogado.email;

            emailPerfil = usuarioLogado.email;

        } else {
            nomeUsuario.textContent = 'nome';
            emailUsuario.textContent = 'email';
        }
    }
}

exibeInformacoes();



// caso o usuário não tenha cadastro, ele deve ter a opção de se cadastrar 

const opcaoCadastro = document.querySelector('#realizarCadastro');
const opcoesPerfil = document.querySelectorAll('.opcaoPerfil');

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
}



// para editar as informações do perfil

const editarPerfil = document.querySelector('#editarPerfil');
const modalPerfil = document.querySelector('.modalPerfil');

if(editarPerfil && modalPerfil){
    const modal = new bootstrap.Modal(modalPerfil);

    editarPerfil.addEventListener('click', (e) => {
        e.preventDefault();
        modal.show();
    });
}



const nomePerfil = document.querySelector('#nomePerfil');
const senhaAtual = document.querySelector('#senhaAtual');
const novaSenha = document.querySelector('#senhaNova');

let senhaNova = '';
let novoNome = '';


function validacoes(){
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

    return true;
}


const salvar = document.querySelector('.botaoSalvar');

if(salvar){
    salvar.addEventListener('click', (e) => {
        if(validacoes()){
            const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

            let index = usuariosCadastrados.findIndex(usuario => usuario.email === usuarioLogado.email);
            
            if(novoNome !== ''){
                usuarioLogado.nome = novoNome;
                usuariosCadastrados[index].nome = novoNome;
            }

            if(senhaNova != ''){
                usuarioLogado.senha = senhaNova;
                usuariosCadastrados[index].senha = senhaNova;
            }

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



// saindo da conta

const sair = document.querySelector('#sairLogin');

if(sair){
    sair.addEventListener('click', () => {
        localStorage.removeItem("usuarioLogado");
        alert('Saindo...');
        window.location.replace('../index.html');
    }); 
}