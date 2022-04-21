// PEGAR QUIZZ DA API

//https://www.10wallpaper.com/wallpaper/1366x768/1404/white_blossom_flowers-Plants_HD_Wallpaper_1366x768.jpg



function listar_quizzUsuario() {
  let opcoes_quizz = document.querySelector(".quizzesUsuario").querySelector(".opcoes_quizz");
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