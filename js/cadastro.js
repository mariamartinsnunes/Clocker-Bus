//melhorar os feedbacks depois (todos os alerts)


//cadastro 

let usuariosCdastrados = [];

const nome = document.querySelector('#nome');
const email = document.querySelector('#email'); 
const senha = document.querySelector('#senha');


function validacoes(){
    if(nome.value.length == 0){
        alert('O nome é obrigatório');
        return false;
    }
    if(nome.value.length < 5){
        alert('Nome deve ter pelo menos 5 caracteres');
        return false;
    } 
    if(nome.validity.patternMismatch){
        alert('Use apenas letras maiusculas ou minusculas no campo nome');
        return false;
    }


    if(email.value.length == 0){
        alert('Informe a o email para realizar o cadastro');
        return false;
    }
    if(email.validity.patternMismatch){
        alert('Campo email incorreto!'); 
        return false;
    } 


    if(senha.value.length == 0){
        alert('Informe a senha para o cadastro');
        return false;
    } 
    if(senha.validity.patternMismatch){
        alert('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, número e símbolo.'); 
        return false;
    }

    return true;
}



function cadastroUsuario(){
    usuariosCdastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };

    usuariosCdastrados.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosCdastrados));
}



const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    if(validacoes()){
        usuariosCdastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

        let emailExiste = false;
        usuariosCdastrados.forEach(function(usuario){
            if(email.value == usuario.email){
                emailExiste = true;
            }
        });

    
        if(emailExiste){
            alert('Não foi possível realizar o cadastro, pois este email já está cadastrado!');

            nome.value = '';
            email.value = '';
            senha.value = ''; 
        
        } else {   
            cadastroUsuario();
            alert('Cadastro realizado com sucesso!');

            nome.value = '';
            email.value = '';
            senha.value = '';

            window.location.replace("../index.html");
        }
    }
});


// ------------------------------------------------------------------------------

//login

const emailLogin = document.querySelector('#emailLogin');
const senhaLogin = document.querySelector('#senhaLogin');


function validacaoLogin(){
    if(emailLogin.value.length == 0){
        alert('Informe o email para o login');
        return false;
    }

    if(senhaLogin.value.length == 0){
        alert('Informe a senha para o login');
        return false;
    }

    return true;
}


const formLogin = document.querySelector('#formLogin');

formLogin.addEventListener('submit', function(e){
    e.preventDefault();

    if(validacaoLogin()){
        usuariosCdastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        let cadastroExiste = false;
        let usuarioLogado = null;

        for(let i = 0; i < usuariosCdastrados.length; i++){
            let usuario = usuariosCdastrados[i];

            if(emailLogin.value.trim() == usuario.email.trim() && senhaLogin.value.trim() == usuario.senha.trim()){
                cadastroExiste = true;
                usuarioLogado = usuario;
                break;
            }
        }

        
        if(cadastroExiste){
            alert('Entrando...');
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
            window.location.replace("../index.html");
        
        } else {
            alert('Usuário não registrado');

            emailLogin.value = '';
            senhaLogin.value = '';
        }
    }
});
