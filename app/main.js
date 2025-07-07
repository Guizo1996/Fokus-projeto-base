const html = document.querySelector("html");
const titulo = document.querySelector(".app__title")
const imagem = document.querySelector(".app__image")
const timer = document.getElementById("timer")

//varaiveis botoes
const btnPlayPauseTexto = document.querySelector("#start-pause span")
const btnPlayPause = document.querySelector(".app__card-primary-butto-icon")
const btnFoco = document.querySelector(".app__card-button--foco") ;
const btnShort = document.querySelector(".app__card-button--curto") ;
const btnLong = document.querySelector(".app__card-button--longo") ;
const botoesAll = document.querySelectorAll(".app__card-button") ;
const btnComecar=document.getElementById("start-pause") ;

// variavel musicas
const musicaPlay = new Audio ('/sons/play.wav') ;
const musicaPause = new Audio ("/sons/pause.mp3") ;
const musicaFim = new Audio ("/sons/beep.mp3") ;
const musicaInput = document.getElementById ("alternar-musica") ;
const musica= new Audio ('/sons/luna-rise-part-one.mp3')
musica.loop = true ;


//tempos iniciais
const tempoInicialfoco = 1
const tempoInicialDescansoCurto = 300
const tempoInicialDescansoLongo = 900

//varaiveis varaiveis
let tempoDecorrido =tempoInicialfoco;
let intervaloId = null;


//add eventos ---------------------------------------------

btnComecar.addEventListener("click", iniciarPausar)

musicaInput.addEventListener("change", () => {
if (musica.paused) {
    musica.play()
}else {musica.pause()}
})

btnComecar.addEventListener("click", () => {

})

btnFoco.addEventListener("click", () => {
    tempoDecorrido=tempoInicialfoco;
    MudarModo("foco");
    btnFoco.classList.add("active");
    })

btnShort.addEventListener("click", () => {
 tempoDecorrido = tempoInicialDescansoCurto
 MudarModo("descanso-curto")
btnShort.classList.add("active");

})

btnLong.addEventListener("click", () => {
tempoDecorrido = tempoInicialDescansoLongo
MudarModo("descanso-longo");
btnLong.classList.add("active");

})

//function -------------------------------------

function MudarModo(modo){
    MudarTimer();
    zerar();
botoesAll.forEach(function(modo){
    modo.classList.remove("active");
})
html.setAttribute("data-contexto", modo)
imagem.setAttribute('src',`/imagens/${modo}.png `);
switch(modo){
    case"foco":
    titulo.innerHTML = `
    Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>
`;
    break;
    
    case "descanso-curto":
    titulo.innerHTML = `
    Que tal dar uma respirada?<br>
    <strong class="app__title-strong">Faça uma pausa curta!</strong>
`;
    break;

    case "descanso-longo":
        titulo.innerHTML = `
        Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>
    `;
    break;
    default: 
    alert("algo deu errado ");
    break;
}

}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        const focoAtivo = html.getAttribute("data-contexto") 
        musicaFim.play()
        alert("tempo finalizado")
        if(focoAtivo == 'foco'){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        ResetarContagem(focoAtivo)
        MudarTimer()
        return
    }
    tempoDecorrido -= 1;
    MudarTimer();
    
}


function iniciarPausar (){
    if(intervaloId){
        musicaPause.play()
        zerar()
        return
    } else{
musicaPlay.play()
intervaloId = setInterval(contagemRegressiva,1000)
btnPlayPauseTexto.textContent = "Pausar"
btnPlayPause.setAttribute("src","/imagens/pause.png")
}}

function zerar (){
    clearInterval(intervaloId)
    intervaloId = null
    btnPlayPauseTexto.textContent="Começar"
    btnPlayPause.setAttribute("src","/imagens/play_arrow.png")
}

function MudarTimer(){
    const tempo =  new Date( tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute:'2-digit',second:"2-digit"})
    timer.innerHTML =`<p>${tempoFormatado}<p>` 
}


function ResetarContagem (modo){
    switch(modo){
        case"foco":
        tempoDecorrido = tempoInicialfoco
        break;
        
        case "descanso-curto":
        tempoDecorrido= tempoInicialDescansoCurto
        break;

        case "descanso-long":
        tempoDecorrido =tempoInicialDescansoLongo ;
        break;

        default: 
        alert("Algo deu errado")
    }
}

MudarTimer();