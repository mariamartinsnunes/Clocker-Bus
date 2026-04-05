const containerRotas = document.getElementById('container-rotas');
const btnAdicionar = document.getElementById('btn-adicionar');


function obterRotas() {
    let rotaSalva = JSON.parse(localStorage.getItem('rotasClockerBus'));
    
    if (!rotaSalva || rotaSalva.length === 0) {
        rotaSalva = [
            {
                id: 1,
                linha: "042 - Centro / Shopping",
                saida: "14:00",
                previsao: "No horário",
                chegada: "14:45",
                pontos: [
                    "Terminal",
                    "Rua das Flores, 10"
                ]
            },
            {
                id: 2,
                linha: "015 - Terminal / Bairro da Liberdade",
                saida: "14:15",
                previsao: "Atrasado 5 min",
                chegada: "15:05",
                pontos: [
                    "Centro",
                    "Avenida Brasil, 890",
                    "Largo da Paz"
                ]
            }
        ];

        localStorage.setItem('rotasClockerBus', JSON.stringify(rotaSalva));
    }
    
    return rotaSalva;
}


function carregarRotas() {
    if(!containerRotas) return;

    const rotas = obterRotas();
    containerRotas.innerHTML = '';

    rotas.forEach(function(rota) {
        const card = document.createElement('div');
        card.className = 'card-rota';

        card.innerHTML = `
            <img src="${rota.imagem}" class="card-img" alt="Mapa da rota">
            <div class="card-info">
                <span>Número da linha: <b>${rota.linha}</b></span>
                <span>Previsão de saída: <b>${rota.saida}</b></span>
                <span>Previsão: <b>${rota.previsao}</b></span>
                <span>Previsão de chegada: <b>${rota.chegada}</b></span>
                <a class="card-link" data-rota-id="${rota.id}" href="#">Mais Informações</a>
            </div>
        `;
        
        containerRotas.appendChild(card);
    });
}



//--------------------------------------------------------------------------

//tive que adicionar algumas funções para que o histórico possa funcionar - Malu
//também adicionei mais informações nas linhas/rotas 


//essa exibe as informações da linha
function exibeInformacoesLinha(linha){

    if(informacoesLinha){
        const conteudoLinha = document.querySelector('#conteudoLinha');
        conteudoLinha.innerHTML = '';

        if(linha){
            conteudoLinha.innerHTML = `
                <p><strong>Linha:</strong> ${linha.linha}</p>
                <p><strong>Previsão do horário de saída:</strong> ${linha.saida}</p>
                <p><strong>Previsão do horário de chegada:</strong> ${linha.chegada}</p>
                <p><strong>Pontualidade:</strong> ${linha.previsao}</p>
                <p><strong>Rota (pontos de parada):</strong></p>
            `;

            const ul = document.createElement('ul');
            linha.pontos.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = p;

                ul.appendChild(li);
            });

            conteudoLinha.appendChild(ul);
        } 
    }
}


//quando o usuário clica no "Mais Informações" do card da linha, a função exibeInformacoesLinha() é chamada

//na lista de histórico do usuário é salvo o id da linha que o usuário acessou - no index 0 é sempre a última linha visualizada

function atualizaHistorico(idRota){
    const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {historicoLinhas: []};

    if(usuarioLogado){
        let index = usuariosCadastrados.findIndex(u => u.email === usuarioLogado.email);

        if(usuarioLogado.historicoLinhas.includes(idRota)){
            usuarioLogado.historicoLinhas = usuarioLogado.historicoLinhas.filter(id => id !== idRota);
            usuariosCadastrados[index].historicoLinhas = usuariosCadastrados[index].historicoLinhas.filter(i => i !== idRota);
        }

        usuarioLogado.historicoLinhas.unshift(idRota);
        usuariosCadastrados[index].historicoLinhas.unshift(idRota);
        
        localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    }
}


const informacoesLinha = document.querySelector('#informacoesLinha');

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('card-link')){
        e.preventDefault();

        const info = e.target;
        const idRota = Number(info.dataset.rotaId);

        const rotaSalva = JSON.parse(localStorage.getItem('rotasClockerBus'));
        
        let linha = rotaSalva.find(r => r.id == idRota);
        
        if(linha){
            exibeInformacoesLinha(linha);

            const modalLinha = new bootstrap.Modal(informacoesLinha);
            modalLinha.show();
        }

        atualizaHistorico(idRota);
    }
});


//--------------------------------------------------------------------------



if (btnAdicionar) {
    btnAdicionar.addEventListener('click', function(e) {
        e.preventDefault();

        let nomeDaLinha = prompt("Digite o número e o destino da nova linha (Ex: 099 - Bairro Novo):");

        if (!nomeDaLinha || nomeDaLinha.trim().length === 0) {
            alert('Aviso: O nome da linha é obrigatório para adicionar!');
            return;
        }

        let rotasAtuais = obterRotas();

        const novaRota = {
            id: rotasAtuais.length + 1,
            linha: nomeDaLinha.trim(),
            saida: "--:--",
            previsao: "Aguardando",
            chegada: "--:--",
            imagem: "https://via.placeholder.com/100x70?text=Novo"
        };

        rotasAtuais.push(novaRota);

        localStorage.setItem('rotasClockerBus', JSON.stringify(rotasAtuais));

        alert('Nova rota adicionada com sucesso no sistema!');
        carregarRotas();
    });
}

carregarRotas();