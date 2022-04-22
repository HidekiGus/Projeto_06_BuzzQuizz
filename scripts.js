// PEGAR QUIZZES DA API (não tá funcionando :P)
let quizzInfo;
let disporQuizz = document.querySelector(".paginaQuizz");
let api = "https://mock-api.driven.com.br/api/v6/buzzquizz/";
let lista_quizzes;

function carregarQuizzes () {
     let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/24')

    promise.then(quizzesServ);
}

carregarQuizzes()

function quizzesServ (resposta) {
  console.log(resposta.data) 
  

}

function pegarQuizzes() {
  let promise = axios.get(api+"quizzes");
  promise.then(listar_quizzSite);
}
pegarQuizzes()

function listar_quizzUsuario() {
  let opcoes_quizz = document.querySelector(".quizzesdoUsuario").querySelector(".opcoes_quizz");
  opcoes_quizz.innerHTML = "<div onclick='exibir()' class='capa_quizz texto_branco'><div class='degradee'></div><img src='imagens/potterhead.jpg'/><h2>O quão Potterhead é você?</h2></div><div  onclick='exibir()' class='capa_quizz texto_branco'><div class='degradee'></div><img src='imagens/potterhead.jpg' /><h2>O quão Potterhead é você?</h2></div>"
}

listar_quizzUsuario()


function listar_quizzSite(resposta) {
  lista_quizzes=resposta.data;
  let texto ="";
  for (i=0; i<lista_quizzes.length; i++){
    let titulo = lista_quizzes[i].title;
    let image = lista_quizzes[i].image
    texto = texto +  "<div onclick='exibir()' class='capa_quizz texto_branco'><div class='degradee'></div><img src="+image+" /><h2>"+titulo+"</h2></div>"
  }
  let opcoes_quizz = document.querySelector(".quizzesSite").querySelector(".opcoes_quizz");
  opcoes_quizz.innerHTML = texto;

}

function exibir() {
  let conteudo = document.querySelector(".conteudo");
  conteudo.classList.add("escondido");
}
