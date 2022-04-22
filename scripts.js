// PEGAR QUIZZES DA API 
let quizzInfo;
let disporQuizz = document.querySelector(".paginaQuizz");
let api = "https://mock-api.driven.com.br/api/v6/buzzquizz/";
let lista_quizzes;

function carregarQuizzes() {
  let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/24')

  promise.then(quizzesServ);
}

carregarQuizzes()

function quizzesServ(resposta) {
  quizzInfo = resposta.data;

  console.log(quizzInfo.questions.length)
  disporQuizz.innerHTML = `<div class="bannerQuiz" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${quizzInfo.image}');">
  <h1>${quizzInfo.title}</h1>
</div>`;

  for (let i = 0; i < quizzInfo.questions.length; i++) {
    disporQuizz.innerHTML +=

      `

      <div class="primeira pergunta">
            <div class="topo-pergunta">
                <h1>${quizzInfo.questions[i].title}</h1>
            </div>

            <div class="respostas">

                <div class="row-1">
                    <img class="alternativa-1" src=${quizzInfo.questions[i].answers[0].image} alt="alternativa-1">
                    <h3>${quizzInfo.questions[i].answers[0].text}</h3>

                    <img class="alternativa-2" src=${quizzInfo.questions[i].answers[1].image} alt="alternativa-2">
                    <h3>${quizzInfo.questions[i].answers[1].text}</h3>
                </div>

                <div class="row-2">
                    <img class="alternativa-3" src=${quizzInfo.questions[i].answers[2].image} alt="alternativa-3">
                    <h3>${quizzInfo.questions[i].answers[2].text}</h3>

                    <img class="alternativa-4" src=${quizzInfo.questions[i].answers[3].image} alt="alternativa-4">
                    <h3>${quizzInfo.questions[i].answers[3].text}</h3>
                </div>

            </div>

        </div>
      
      `

  }

}


//  LISTAGEM      DOS      QUIZZES   ------------------------------



function listar_quizzUsuario() {
  let opcoes_quizz = document.querySelector(".quizzesdoUsuario").querySelector(".opcoes_quizz");
  opcoes_quizz.innerHTML = `
    <div onclick='exibir(this)' class='capa_quizz texto_branco'>
      <div class='degradee'></div>
      <img src='imagens/potterhead.jpg'/>
      <h2>O quão Potterhead é você?</h2>
    </div>
    <div  onclick='exibir(this)' class='capa_quizz texto_branco'>
      <div class='degradee'></div>
      <img src='imagens/potterhead.jpg' />
      <h2>O quão Potterhead é você?</h2>
    </div>`
}

listar_quizzUsuario()


// LISTAR TODOS OS QUIZZES 
// Pega a lista de quizzes da api 
// Chama a função para listar quizzes que está logo abaixo
function pegarQuizzeSite() {
  let promise = axios.get(api + "quizzes");
  promise.then(listar_quizzSite);
}
pegarQuizzeSite()

// Função chamada se a promise efetuado com sucesso
// Pega a resposta da api 
// E adiciona os quizzes na tela principal do site abaixo de "Todos os quizzes"
function listar_quizzSite(resposta) {
  lista_quizzes = resposta.data;
  let texto = "";
  for (i = 0; i < lista_quizzes.length; i++) {
    // add id no nome da classe para ser pego depois para exibir quizz
    texto = texto + `
    <div onclick='exibir(this)' class='capa_quizz texto_branco  ${lista_quizzes[i].id}'>  
      <div class='degradee'></div>
      <img src=${lista_quizzes[i].image} />
      <h2>${lista_quizzes[i].title}</h2>
     </div> `
  }
  let opcoes_quizz = document.querySelector(".quizzesSite").querySelector(".opcoes_quizz");
  opcoes_quizz.innerHTML = texto;

}

// FIM   DA  LISTAGEM  DOS  QUIZZES --------------------------


// EXIBIR   QUIZZ     --------------------------------------

function exibir(elemento) {
  esconderElemento(".conteudo");
  // Pega o id que estava no nome da classe
  let id = elemento.classList[2];
}

// FIM DO  EXIBIR   QUIZZ     --------------------------------------

// CRIAÇÃO   DO    QUIZZ     --------------------------------

function pagina_um() {
  let pagina_um = document.querySelector(".pagina_um");
  esconderElemento(".conteudo");
  esconderElemento(".paginaQuizz");
  esconderElemento(".pagina_dois");
  esconderElemento(".pagina_tres");
  esconderElemento(".pagina_quatro");

  pagina_um.innerHTML = `

  <div class="titulo bold">Comece pelo começo</div>

  <div class="formulario" >

    <div class="bloco_inputs" >

        <input class="primeiro_input" minlength="20" maxlength="65" type="text" required placeholder="Titulo do seu Quizz"/>

        <input class="segundo_input" type="url" required placeholder="URL da imagem do seu quizz"/>

        <input class="terceiro_input" type="text" placeholder="Quantidade de perguntas do quizz"/>

        <input class="quarto_input" type="text" placeholder="Quantidade de níveis do quizz"/>
    </div>
    
        <button type="submit">Prosseguir para criar perguntas</button>
    
  </div>`


}

pagina_um()

function especificacoesQuizz() {
  let tituloInput = document.querySelector(".primeiro_input").value
  let imagemInput = document.getElementsByClassName(".segundo_input")

  let qtdPerguntas = document.querySelector(".terceiro_input").value
  let qtdNiveis = document.querySelector(".quarto_input").value


  console.log(imagemInput.type)
  if ((tituloInput.length >= 20 && tituloInput <= 65)) {
    if (qtdPerguntas < 3) {
      alert("Erro! A quantidade mínima de perguntas é 3")
    }
    else if (qtdNiveis < 2) {
      alert("Erro! A quantidade mínima de níveis é 2")
    } else { pagina_dois() }
  } else {
    alert("Preencha todos os dados corretamente!")
  }



}

// TELA 3.2 : PERGUNTAS DO QUIZ (conforme requisitos no notion)
// Adiciona o formulário de perguntas da etapa dois da criação
function pagina_dois() {
  let pagina_dois = document.querySelector(".pagina_dois");
  // esconder os outros elementos do site
  esconderElemento(".conteudo");
  esconderElemento(".paginaQuizz");
  esconderElemento(".pagina_um");
  esconderElemento(".pagina_tres");
  esconderElemento(".pagina_quatro");
  pagina_dois.innerHTML = ` 
    <div class="titulo bold"> Crie suas perguntas </div>
    <div class="formulario" >
      <div class="bloco_inputs" >
          <div class="bold" >Pergunta 1</div>
          <input class="primeiro_input" type="text" placeholder="Texto da Pergunta" />
          <input class="segundo_input" type="text" placeholder="Cor de fundo da pergunta" />
      </div>
      <div class="bloco_inputs" >
          <div class="bold" >Resposta Correta</div>
          <input class="primeiro_input" type="text" placeholder="Resposta correta" />
          <input class="segundo_input" type="text" placeholder="URL da imagem" />
      </div>
      <div class="button">
          <button type="submit">Prosseguir para criar níveis</button>
      </div>
    </div>
  `
}
//pagina_dois()

// FIM DA CRIAÇÃO  DE  UM QUIZZ    --------------------------


// AREA DE TESTES ---\/-----\/-----\/---

// Esconde o elemento recebido como parâmetro
function esconderElemento(tag) {
  document.querySelector(tag).classList.add("escondido");
}

// Exibe o elemento recebido como parâmetro
function exibirElemento(tag) {
  document.querySelector(tag).classList.remove("escondido");
}

// Esconde o elemento recebido como primeiro parâmetro e
// Exibe o elemento recebido como segundo parâmetro
function trocaTela(elementoPraEsconder, elementoPraExibir) {
  esconderElemento(elementoPraEsconder);
  exibirElemento(elementoPraExibir);
}

// Confere se o usuário tem quizzes
function confereQuizzesUsuario() {
  let parente = document.querySelector(".quizzesdoUsuario");
  let quizzes_usuario = parente.querySelector(".opcoes_quizz");
  return quizzes_usuario.children.length;
}

// Controla qual botão aparece na tela inicial:
// Se o usuário tem:
// === 0 quizzes -> Botão Grande
// !== 0 quizzes -> Seus Quizzes
function controlaBotaoCriarQuiz() {
  if (confereQuizzesUsuario() === 0) {
    // Mostra botão grande
    exibirElemento(".quizzesUsuarios");
    // Esconde quizzes do Usuário
    esconderElemento(".quizzesdoUsuario");
  } else {
    // Esconde botão grande e exibe Seus Quizzes
    trocaTela(".quizzesUsuarios", ".quizzesdoUsuario");
    // Exibe quizzes do Usuário
    exibirElemento(".quizzesdoUsuario");
  }
}

controlaBotaoCriarQuiz();

function botaoCriarQuiz() {
  trocaTela(".conteudo", ".pagina_tres");
}
