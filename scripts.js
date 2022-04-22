// PEGAR QUIZZES DA API (não tá funcionando :P)
let quizzInfo;
let disporQuizz = document.querySelector(".paginaQuizz");
let api = "https://mock-api.driven.com.br/api/v6/buzzquizz/";
let lista_quizzes;

// FUNÇAO PARA ESCONDER TAG -----------------------------------
function esconderTag(classe) {
  let elemento = document.querySelector("."+classe);
  elemento.classList.add("escondido");
}

function carregarQuizzes () {
     let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/24')

    promise.then(quizzesServ);
}

carregarQuizzes()

function quizzesServ (resposta) {
  quizzInfo = resposta.data;
  
console.log(quizzInfo.questions)
  disporQuizz.innerHTML = `<div class="bannerQuiz">
  <h1>${quizzInfo.title}</h1>
</div>`;

  for (let i = 0; i < 10; i++) {
    disporQuizz.innerHTML += `
    

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

function pegarQuizzes() {
  let promise = axios.get(api+"quizzes");
  promise.then(listar_quizzSite);
}
pegarQuizzes()

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


function listar_quizzSite(resposta) {
  lista_quizzes=resposta.data;
  let texto ="";
  for (i=0; i<lista_quizzes.length; i++){
    texto = texto +  `
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
  let conteudo = document.querySelector(".conteudo");
  console.log(elemento.classList[2]);
  let id = elemento.classList[2];
  esconderTag("conteudo");
}

// FIM DO  EXIBIR   QUIZZ     --------------------------------------

// CRIAÇÃO   DO    QUIZZ     --------------------------------

function pagina_dois() {
  let pagina_dois = document.querySelector(".pagina_dois");
  esconderTag("conteudo");
  esconderTag("paginaQuizz");
  pagina_dois.innerHTML =  ` 
      afhf
  `
}
pagina_dois()

// FIM DA CRIAÇÃO  DE  UM QUIZZ    --------------------------
