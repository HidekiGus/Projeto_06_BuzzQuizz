// PEGAR QUIZZES DA API (não tá funcionando :P)
let quizzInfo;
let disporQuizz = document.querySelector(".paginaQuizz");

function carregarQuizzes () {
     let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/24')

    promise.then(quizzesServ);
}

carregarQuizzes()

function quizzesServ (resposta) {
  console.log(resposta.data) 

    
    

}

<<<<<<< HEAD
=======
//https://www.10wallpaper.com/wallpaper/1366x768/1404/white_blossom_flowers-Plants_HD_Wallpaper_1366x768.jpg



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
>>>>>>> 3104e5d2119e2b11fa3cac5ab9a4fc920c216df3
