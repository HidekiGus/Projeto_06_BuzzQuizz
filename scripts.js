// PEGAR QUIZZES DA API
let quizzInfo;
let disporPágina = document.querySelector(".paginaQuizz");
let api = "https://mock-api.driven.com.br/api/v6/buzzquizz/";
let lista_quizzes;
let lista_perguntas=[];
let lista_niveis=[];
let id_quizz;

function carregarQuizzes(id) {
  let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/' + id)
  promise.then(quizzesServ);
  
}

//carregarQuizzes(24)

// Função que torna as respostas aleatórias
function embaralhar() { 
  return Math.random() - 0.5;
}

// NAVEGAÇÃO   APÓS   QUIZZ

function finalizacaoQuizz() {

}

function quizzesServ(resposta) {

  quizzInfo = resposta.data;
  trocaTela(".conteudo", ".paginaQuizz")
  esconderElemento(".criacao_quizz");

  
  disporPágina.innerHTML="";
  disporPágina.innerHTML += `<div class="bannerQuiz" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url(${quizzInfo.image}); background-size: cover;">
  <h1>${quizzInfo.title}</h1>
  </div>
  
  <div class="perguntas"></div>
  <div class="resultado escondido">
    <div class="topo-resultado">
      <h1>dddddddddddddd</h1>
    </div>

    <div class="row-1">
      <div class="bloco" >
        <img src='imagens/potterhead.jpg' alt="alternativa-1">
      </div>          
      <div class="bloco" >
        <h3>ddddddddddddddddddd</h3>
      </div>
    </div>
  </div>
  <div class="caixa-bottom">
  <div class="botoes">
  <button class="restart" onclick="restartQuizz()">Reiniciar Quizz</button>
  <button class="home" onclick="voltarHome()">Voltar pra home</button>
  </div>    

</div>`;


  let disporQuizz = document.querySelector(".perguntas")


  for (let i = 0; i < quizzInfo.questions.length; i++) {

    // A lista de respostas chama a função embaralha
    quizzInfo.questions[i].answers.sort(embaralhar)

    disporQuizz.innerHTML +=

      `

      <div class="pergunta">
            <div class="topo-pergunta">
                <h1>${quizzInfo.questions[i].title}</h1>
            </div>

            <div class="respostas ${[i]}">

                <div class="row-1">

                    <div class="alternativa-1 ${quizzInfo.questions[i].answers[0].isCorrectAnswer}" onclick="acaoRespostas(this)">
                    <img src=${quizzInfo.questions[i].answers[0].image} alt="alternativa-1">
                    <h3>${quizzInfo.questions[i].answers[0].text}</h3>
                    </div>          

                    <div class="alternativa-2 ${quizzInfo.questions[i].answers[1].isCorrectAnswer}" onclick="acaoRespostas(this)">
                    <img src=${quizzInfo.questions[i].answers[1].image} alt="alternativa-2">
                    <h3>${quizzInfo.questions[i].answers[1].text}</h3>
                    </div> 

                </div>

                <div class="row-2">

                    <div class="alternativa-3 ${quizzInfo.questions[i].answers[2].isCorrectAnswer}" onclick="acaoRespostas(this)">
                    <img src=${quizzInfo.questions[i].answers[2].image} alt="alternativa-3">
                    <h3>${quizzInfo.questions[i].answers[2].text}</h3>
                    </div>

                    <div class="alternativa-4 ${quizzInfo.questions[i].answers[3].isCorrectAnswer}" onclick="acaoRespostas(this)">
                    <img src=${quizzInfo.questions[i].answers[3].image} alt="alternativa-4">
                    <h3>${quizzInfo.questions[i].answers[3].text}</h3>
                    </div>

                </div>

            </div>

        </div>
      
      `

  }

}

// COMPORTAMENTO DE RESPOSTAS ---------------------------

function acaoRespostas(elemento) {
  let qualPergunta = elemento.parentNode.parentNode;
 
  let alt1 = qualPergunta.querySelector(".alternativa-1")
  let alt2 = qualPergunta.querySelector(".alternativa-2")
  let alt3 = qualPergunta.querySelector(".alternativa-3")
  let alt4 = qualPergunta.querySelector(".alternativa-4")

  let perguntas = [alt1, alt2, alt3, alt4]

  for (let i = 0; i < perguntas.length; i++) {
    perguntas[i].classList.add("filtroBranco")
    elemento.classList.remove("filtroBranco")
    perguntas[i].classList.add("desabled")
    if (perguntas[i].classList.contains("true")) {
      perguntas[i].classList.add("letraVerde")
    } else { perguntas[i].classList.add("letraVermelha") }

  }

  setTimeout(rolarProxPergunta ,2000)
  
}

function rolarProxPergunta() {
  window.scrollBy(0, 750)
}



function restartQuizz () {
  esconderElemento(".conteudo")
  carregarQuizzes(id_quizz)
  document.querySelector(".bannerQuiz").scrollIntoView({behavior: 'smooth'});
  document.querySelector(".caixa-bottom").classList.add("escondido")
}

function voltarHome () {
  trocaTela(".paginaQuizz",".conteudo")
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
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
      <img src="${lista_quizzes[i].image}"  />
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
  if (elemento.classList.length === 1) {
    let id = elemento.classList[0];
    id_quizz=id;
    carregarQuizzes(id)
  } else {
    let id = elemento.classList[2];
    id_quizz=id;
    carregarQuizzes(id)
  }
}

// FIM DO  EXIBIR   QUIZZ     --------------------------------------

// ESCONDE TODOS OS ELEMENTOS

function esconderTudo() {  
esconderElemento(".conteudo");
esconderElemento(".paginaQuizz");
esconderElemento(".pagina_um");
esconderElemento(".pagina_dois");
esconderElemento(".pagina_tres");
esconderElemento(".pagina_quatro");
}


//  VOLTAR  PARA  HOME   --------------------------------------
function voltar_home() {
  trocaTela(".criacao_quizz", ".conteudo")
  esconderElemento(".paginaQuizz");
}

// CRIAÇÃO   DO    QUIZZ     --------------------------------



// VERIFICAÇÕES DOS INPUTS     --------------------------------------

// FUNÇÃO PARA VERIFICAR O NÚMERO DE CARACTERES 
// A função pega a tag input , o numero minimo de caracteres e o maximo de caracteres
function numCaracter(input, minCaracter, maxCaracter) {
  let texto = input.value;
  input.classList.toggle("invalid");
  if (maxCaracter !== false) {
    if (texto.length >= minCaracter && texto.length <= maxCaracter) {
      input.classList.remove("invalid")
    } else {
      input.classList.add("invalid")
    }
  } else {
    if (texto.length >= minCaracter) {
      input.classList.remove("invalid")
    } else {
      input.classList.add("invalid")
    }
  }
}

// FUNÇÃO PARA VERIFICAR SE A COR É HEXADECIMAL
function hexColor(input) {

  // Forma padrão de uma cor Hexadecimal
  let formaHex = /^#[A-Fa-f0-9]{6}$/;
  // ^ representa o início da string.
  // # representa o código de cor hexadecimal deve começar com um símbolo '#'.
  // [A-Fa-f0-9]{6} representa a letra de af, AF ou dígito de 0-9 com um comprimento de 6.
  // $ representa o final da string.

  let texto = input.value;

  //  test() executa uma busca por uma correspondência entre uma expressão formaHex e a string texto
  input.classList.toggle("invalid")
  if (formaHex.test(texto)) {
    input.classList.remove("invalid")
  } else {
    input.classList.add("invalid")
  }
}

// FUNÇÃO PARA VERIFICAR URL
function verifURL(input) {
  // Forma padrão de uma url
  let url = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  // Formato final de uma URL de Imagem deve seguir padrão abaixo
  let verImg = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
  input.classList.toggle("invalid");
  let texto = input.value;

  // Na PÁGINA_DOIS a condição abaixo será necessária para invalidar o input que vazio da resposta incorreta 1 , visto que precisa de pelo menos uma resposta incorreta
  if (input.classList[1] !== undefined) {
    if (input.classList[1] === "um") {
      if (texto.length === 0) {
        input.classList.add("invalid")
      }
    }
  }

  if (texto.length !== 0) {
    if (url.test(texto) && verImg.test(texto)) {
      input.classList.remove("invalid")
    } else {
      input.classList.add("invalid")
    }
  }
}

// FUNÇÃO PRA VER SE VALOR É DE 0 A 100
function verifPorcentagem(input) {
  if ((input.value >= 0) && (input.value <= 100)) {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
  }
}

// FUNÇÃO PRA VER SE EXISTE PELO MENOS 1 NIVEL COM 0%

function existeNivelZero() {
  let pagina = document.querySelector(".pagina_tres");
  let lista_blocos = pagina.querySelectorAll(".bloco_inputs");
  let contador_0 = 0;

  //for (i=0; i<lista_blocos.length; i++) {
  let lista_inputs = lista_blocos[0].querySelectorAll(".inputs");
  let variavel = lista_inputs[1].value;
  if (variavel === '0') {
    contador_0 = 1;
    console.log("deu");
  }
  lista_blocos[0].classList.toggle("invalid");
  if (contador_0 === 0) {
    lista_blocos[0].classList.add("invalid");
    console.log("nao tem input 0");
  } else {
    lista_blocos[0].classList.remove("invalid");
    console.log("tem pelo menos 1 == 0");
  }
}

// FUNÇÕES PARA VALIDAR SE OS INPUTS NÃO ESTÃO VAZIOS E SE HÁ ALGUM INPUT INVÁLIDO (ou seja com o invalid na classe)

// Abaixo, a função verifica se há algum input essencial vazio
// Retorna True se os inputs estiverem preenchidos
function verInputs(nomePagina) {
  let pagina = document.querySelector(nomePagina);
  let lista_inputs = pagina.querySelectorAll("input");
  for (i = 0; i < lista_inputs.length; i++) {
    let item = lista_inputs[i];

    // A primeira condição é para PÁGINA_DOIS , verificar se a resposta incorreta 1 está preenchida, as outras não têm a mesma obrigatoriedade

    if (item.classList.contains("dois") || item.classList.contains("tres")) {
      let primeiro = item.parentNode.children[0];
      let segundo = item.parentNode.children[1];
      if ((primeiro.value !== "" && segundo.value === "") || (primeiro.value === "" && segundo.value !== "")) {
        alert("Algum campo não foi preenchido. Por favor, verifique.")
        return false
      }
    } else {
      if (item.value === "") {
        alert("Algum campo não foi preenchido. Por favor, verifique.")
        return false
      }
    }
    if (i === lista_inputs.length - 1) {
      return true
    }
  }

}

// Abaixo, a função verifica se há algum input tem classe invalid
// Retorna True se os inputs não tiverem invalid
function verInvalid(nomePagina) {
  let pagina = document.querySelector(nomePagina)

  // Verifica se há algum elemento com a classe invalid
  if (pagina.querySelector(".invalid") !== null) {
    let elemPai = pagina.querySelector(".invalid").parentNode;
    if (elemPai.classList[0] === "dupla_input" && nomePagina === ".pagina_dois") {
      alert("Verifique o item Respostas Incorretas, há algo inválido.")
      return false
    } else {
      alert(`Verifique o item  ${elemPai.innerText}, há algo inválido.`)
      return false
    }
  } else {
    return true
  }
}


// FIM DE VERIFICAÇÕES DOS INPUTS   ---------------------------------------



function pagina_um() {
  let pagina_um = document.querySelector(".pagina_um");
  esconderTudo();
  exibirElemento(".pagina_um");


  pagina_um.innerHTML = `

  <div class="titulo bold">Comece pelo começo</div>

  <div class="formulario" >

    <div class="bloco_inputs" >

        <input class="primeiro_input inputs" minlength="20" maxlength="65" type="text" required placeholder="Titulo do seu Quizz"/>

        <input class="segundo_input inputs" type="url" required placeholder="URL da imagem do seu quizz"/>

        <input class="terceiro_input inputs" type="text" placeholder="Quantidade de perguntas do quizz"/>

        <input class="quarto_input inputs" type="text" placeholder="Quantidade de níveis do quizz"/>
    </div>
  </div>
  <div class="button">
        <button type="submit" onclick="especificacoesQuizz()">Prosseguir para criar perguntas</button>
    </div> `
}

//pagina_um()


function especificacoesQuizz() {

  function validateUrl(url) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(url);
  }

  let imagemInput = document.querySelector(".segundo_input").value
  let tituloInput = document.querySelector(".primeiro_input").value
  let qtdPerguntas = document.querySelector(".terceiro_input").value
  let qtdNiveis = document.querySelector(".quarto_input").value

  if ((tituloInput.length >= 20 && tituloInput.length <= 65) && validateUrl(imagemInput) === true) {
    if (qtdPerguntas < 3) {
      alert("Erro! A quantidade mínima de perguntas é 3")
    }
    else if (qtdNiveis < 2) {
      alert("Erro! A quantidade mínima de níveis é 2")
    } else { pagina_dois() }
  } else {
    alert("Preencha todos os dados corretamente!")
  }

  console.log(validateUrl(imagemInput))
  console.log(imagemInput)
  criacao_divs();
}






// TELA 3.2 : PERGUNTAS DO QUIZ (conforme requisitos no notion)

// Para validar e armazenar as perguntas 
function addPerguntas() {

  let pagina = document.querySelector(".pagina_dois");
  if(pagina.querySelector(".aberto")!==null) {
  // Verifica se não inputs inválidos e/ou vazios
  if (verInvalid(".pagina_dois") && verInputs(".pagina_dois")) {

    let lista_formulario = pagina.querySelectorAll(".formulario");

    // Pegar a tag formulario
    for (i = 0; i < lista_formulario.length; i++) {
      let formulario = lista_formulario[i];
      let lista_resposta = [];
      // Pegar os inputs dentro do formulario
      let lista_inputs = formulario.querySelectorAll("input");

      if (lista_inputs.length !== 0) {
        let resposta_correta = {
          text: lista_inputs[2].value,
          image: lista_inputs[3].value,
          isCorrectAnswer: true
        }
        let resposta_incorreta = {
          text: lista_inputs[4].value,
          image: lista_inputs[5].value,
          isCorrectAnswer: false
        }
        lista_resposta.push(resposta_correta)
        lista_resposta.push(resposta_incorreta)
        if (lista_inputs[6].value !== "") {
          let resposta_incorreta = {
            text: lista_inputs[6].value,
            image: lista_inputs[7].value,
            isCorrectAnswer: false
          }
          lista_resposta.push(resposta_incorreta)
        }
        if (lista_inputs[8].value !== "") {
          let resposta_incorreta = {
            text: lista_inputs[8].value,
            image: lista_inputs[9].value,
            isCorrectAnswer: false
          }
          lista_resposta.push(resposta_incorreta)
        }
        let question = {
          title: lista_inputs[0].value,
          color: lista_inputs[1].value,
          answers: lista_resposta
        }
        lista_perguntas.push(question)
      }
    }
    console.log(lista_perguntas)
    esconderTudo();
    pagina_tres();
    exibirElemento(".pagina_tres");
  }
  }
}

// FUNÇÃO ABAIXO É UMA FUNÇÃO QUE ABRE E FECHA UM ELEMENTO/ FORMULÁRIO, INSERINDO E TIRANDO CÓDIGOS
function collapse(string) {
  // pega o formulario correspondente ao numero na string
  let form = document.querySelector(".formulario"+".num"+string);
  // verifica se o formulario foi aberto ou não , ou seja , verifica se na classe da div class formulario tem a classe "aberto"
  // se false ele vai inserir inputs para abrir formulario
  // se true ele vai voltar ao que era antes
  let class_form = form.classList.contains("aberto");
  if(class_form===false){
    form.classList.toggle("aberto") // add a classe aberto
    let div_inicial =form.querySelector(".bloco_inputs"); // pega a div com classe bloco_inputs
    div_inicial.innerHTML=  div_inicial.innerHTML + `
       <input class="inputs" onchange='numCaracter( this, 20, false)' type="text" placeholder="Texto da Pergunta" />
       <input class="inputs" onchange='hexColor(this)' type="text" placeholder="Cor de fundo da pergunta (hexadecimal)" />
    `

    let div_sec =form.querySelector(".bold");
    div_sec.setAttribute("onclick", `collapse("${string}")`) // adiciona onclick no titulo do formulario (ex: Pergunta 2)
    form.querySelector("ion-icon").classList.toggle("escondido"); // esconde o ion-icon
    div_inicial.classList.toggle("inline") // a classe inline que alinhava o icone com o titulo é retirado
    form.innerHTML=  form.innerHTML + `
    <div class="bloco_inputs" >
        <div class="bold" >Resposta Correta</div>
        <input class="inputs" onchange='numCaracter( this, 1, false)' type="text" placeholder="Resposta correta" />
        <input class="inputs"  onchange='numCaracter( this, 1, false),verifURL(this)' type="text" placeholder="URL da imagem" />
    </div>
    <div class="bloco_inputs" >
        <div class="bold" >Respostas Incorretas</div>
        <div class="dupla_input">
          <input class="inputs um" onchange='numCaracter( this, 1, false)'  type="text" placeholder="Resposta Incorreta 1" />
          <input class="inputs um" onchange='verifURL(this)' type="text" placeholder="URL da imagem 1" />
        </div>
        <div class="dupla_input">
          <input class="inputs dois" type="text" placeholder="Resposta Incorreta 2" />
          <input class="inputs dois" onchange='verifURL(this)' type="text" placeholder="URL da imagem 2" />
        </div>
        <div class="dupla_input">
          <input class="inputs tres" type="text" placeholder="Resposta Incorreta 3" />
          <input class="inputs tres" onchange='verifURL(this)' type="text" placeholder="URL da imagem 3" />
        </div>
    </div>
    `

  } else {
    form.classList.toggle("aberto");  // tira a classe aberto
    form.innerHTML="";
    // abaixo a div de classe formulario volta ao que era antes 
    form.innerHTML=  form.innerHTML + `
    <div class="bloco_inputs inline" >
      <div class="bold" >Pergunta ${string}</div>
      <ion-icon onclick='collapse("${string}")' name="create-outline"></ion-icon>
    </div>
    `
  }
}
// Para validar e armazenar os níveis 
function addNiveis(){
  existeNivelZero();
  // Verifica se não inputs inválidos e/ou vazios

  if(verInputs(".pagina_tres")){
   
    let pagina = document.querySelector(".pagina_tres");
    let lista_formulario=pagina.querySelectorAll(".formulario");

    // Pegar a tag formulario
    for (i=0;i<lista_formulario.length;i++){
      let formulario = lista_formulario[i];
      // Pegar os inputs dentro do formulario
      let lista_inputs = formulario.querySelectorAll("input");

      if(lista_inputs.length!==0){
        let nivel = {
          title:lista_inputs[0].value,
          image:lista_inputs[1].value,
          text:lista_inputs[2].value,
          minValue:lista_inputs[3].value
        }
        lista_niveis.push(nivel);
      }
    }
  }
}
   
// Adiciona o formulário de perguntas da etapa dois da criação
function pagina_dois() {
  // esconder os outros elementos do site
  esconderTudo();
  exibirElemento(".pagina_dois");
  
}

//pagina_dois();

// Adiciona o formulário de perguntas da etapa dois da criação
function pagina_tres() {
  // esconder os outros elementos do site
  esconderTudo();
  exibirElemento(".pagina_tres");
}


// TELA 3.4: SUCESSO DO QUIZ (conforme requisitos no notion)
// Adiciona uma mensagem de sucesso, representando a finalização da criação do quizz
function pagina_quatro() {
  let pagina_quatro = document.querySelector(".pagina_quatro");
  // esconder os outros elementos do site
  esconderTudo();
  exibirElemento(".pagina_quatro");

  pagina_quatro.innerHTML = ` 
    <div class="titulo bold"> Seu quizz está pronto! </div>
    <div class='capa_quizz_construcao texto_branco'>
      <div class='degradee'></div>
      <img src='imagens/potterhead.jpg'/>
      <h2>O quão Potterhead é você?</h2>
    </div>
    <div class="button">
          <button onclick='exibir(this)' class='${criacao_id}' >Acessar Quizz</button>
          <div onclick='voltar_home()' class="texto_cinza"> Voltar para home </div>
    </div>
  `
}
//pagina_quatro()
// FIM DA CRIAÇÃO  DE  UM QUIZZ    --------------------------


// FUNÇÕES PRA ESCONDER E EXIBIR ELEMENTOS ------------------

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


// FIM FUNÇÕES PRA ESCONDER E EXIBIR ELEMENTOS --------------

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
  esconderTudo();
  exibirElemento(".pagina_um");
  pagina_um();
}



function criacao_divs() {
  let pagina = document.querySelector(".pagina_um");
  let inputs = pagina.querySelectorAll("input");

  let num_perguntas = Number(inputs[2].value);
  let num_niveis = Number(inputs[3].value);

  let pagina_dois = document.querySelector(".pagina_dois");
  let pagina_tres = document.querySelector(".pagina_tres");

  // CRIAÇÃO DA PAGINA DOIS

  pagina_dois.innerHTML +=  ` 
  <div class="titulo bold"> Crie suas perguntas </div>
  `;

  for (i=0; i<num_perguntas; i++) {
    pagina_dois.innerHTML += `
    <div class="formulario num${i+1}" >
    <div class="bloco_inputs inline" >
          <div class="bold" >Pergunta ${i+1}</div>
          <ion-icon onclick='collapse("${i+1}")' name="create-outline"></ion-icon>
      </div>
  </div>`
  }

  pagina_dois.innerHTML += `
  <div class="button">
        <button onclick='addPerguntas()' type="submit">Prosseguir para criar níveis</button>
  </div>
`;

  // FIM DA CRIAÇÃO DA PAGINA DOIS

  // CRIAÇÃO DA PAGINA TRES

  pagina_tres.innerHTML +=  ` 
  <div class="titulo bold"> Agora, decida os níveis! </div>
  `;

 for (i=0; i<num_niveis; i++) {
    pagina_tres.innerHTML += `
    <div class="formulario" >
      <div class="bloco_inputs" >
          <div class="bold">Nível ${i+1}</div>
          <input class="inputs" onchange='numCaracter(this, 10, false)' type="text" placeholder="Título do nível" />
          <input class="inputs" onchange='verifPorcentagem(this)' type="number" placeholder="% de acerto mínima" />
          <input class="inputs" onchange='verifURL(this)' type="text" placeholder="URL da imagem do nível" />
          <input class="inputs_grande" onchange='numCaracter(this, 30, false)' type="text" placeholder="Descrição do nível" />
      </div>
    </div>
    `
  }

  pagina_tres.innerHTML += `
  <div class="button">
    <button onclick='addNiveis()' type="submit">Finalizar Quizz</button>
  </div>
`;

  // FIM DA CRIAÇÃO DA PAGINA TRES
}
