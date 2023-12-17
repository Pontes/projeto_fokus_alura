const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const playPauseBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

const soundStartCount = new Audio('./sons/play.wav');
const soundPauseCount = new Audio('./sons/pause.mp3');
const soundFinishCount = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundo = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 900;
   alterarContexto('descanso-longo');
   longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case "descanso-curto" :
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case  "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundo<=0){
        soundFinishCount.play();
        alert('Tempo Finalizado');        
        zerar();
        return
    }
    tempoDecorridoEmSegundo -=1;
    mostrarTempo();

    // console.log('Temporizador' + tempoDecorridoEmSegundo);
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
        
    if(intervaloId){
        soundPauseCount.play();
        zerar();
        return;
    }
        soundStartCount.play()
    
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    playPauseBt.setAttribute('src', './imagens/pause.png');
}
function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar";
    playPauseBt.setAttribute('src', './imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundo * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
