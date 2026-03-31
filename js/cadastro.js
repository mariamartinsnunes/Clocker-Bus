//função para cadastrar usuário
//usando o localStorage, o usuário já fica salvo para login

function cadastroUsuario(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
}


const cadastro = document.getElementById("cadastrar");

cadastro.addEventListener('click', cadastroUsuario);