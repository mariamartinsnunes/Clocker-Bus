//melhorar os feedbacks depois (todos os alerts)


//adicionado as informações do usuário logado na página

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
console.log(usuarioLogado);

const nomeUsuario = document.querySelector('#nomeUsuario');
const emailUsuario = document.querySelector('#emailUsuario');

if(nomeUsuario && emailUsuario){
    if(usuarioLogado){
        nomeUsuario.textContent = usuarioLogado.nome;
        emailUsuario.textContent = usuarioLogado.email;

    } else {
        nomeUsuario.textContent = 'nome';
        emailUsuario.textContent = 'email';
    }
}



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



// saindo da conta

const sair = document.querySelector('#sairLogin');

if(sair){
    sair.addEventListener('click', () => {
        localStorage.removeItem("usuarioLogado");
        alert('Saindo...');
        window.location.replace('../index.html');
    }); 
}