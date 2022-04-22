// PEGAR QUIZZES DA API (não tá funcionando :P)
let quizzInfo;
let disporQuizz = document.querySelector(".paginaQuizz");

function carregarQuizzes () {
     let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/24')

    promise.then(quizzesServ);
}

carregarQuizzes()

function quizzesServ (resposta) {
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


function listar_quizzUsuario() {
  let opcoes_quizz = document.querySelector(".quizzesdoUsuario").querySelector(".opcoes_quizz");
  opcoes_quizz.innerHTML = "<div onclick='exibir()' class='capa_quizz texto_branco'><div class='degradee'></div><img src='imagens/potterhead.jpg'/><h2>O quão Potterhead é você?</h2></div><div  onclick='exibir()' class='capa_quizz texto_branco'><div class='degradee'></div><img src='imagens/potterhead.jpg' /><h2>O quão Potterhead é você?</h2></div>"
}
listar_quizzUsuario()

function listar_quizzSite() {
  let opcoes_quizz = document.querySelector(".quizzesSite").querySelector(".opcoes_quizz");
  opcoes_quizz.innerHTML = "<div onclick='exibir()' class='capa_quizz texto_branco'><div class='degradee'></div><img src='imagens/simpsons.png'/><h2>Acerte os personagens corretos dos Simpsons e prove seu amor!</h2></div><div class='capa_quizz texto_branco'><div onclick='exibir()' class='degradee'></div><img src='imagens/simpsons.png' /><h2>Acerte os personagens corretos dos Simpsons e prove seu amor!</h2></div><div class='capa_quizz texto_branco'><div onclick='exibir()' class='degradee'></div><img src='imagens/simpsons.png'/><h2>Acerte os personagens corretos dos Simpsons e prove seu amor!</h2></div><div onclick='exibir()' class='capa_quizz texto_branco'><div class='degradee'></div><img src='imagens/simpsons.png' /><h2>Acerte os personagens corretos dos Simpsons e prove seu amor!</h2></div>"
}
listar_quizzSite()

function exibir() {
  let conteudo = document.querySelector(".conteudo");
  conteudo.classList.add("escondido");
}
