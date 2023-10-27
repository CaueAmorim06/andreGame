const personagem = document.getElementById('sprite');
let posicaoHorizontal = 0;
let posicaoVertical = 0;
const step = 20;  
 //ATIRAR ====== INICIO
function atirar() {
    const tiro = document.createElement('div');
    tiro.classList.add('tiro');
    tiro.id = 'tiro'; 
    document.body.appendChild(tiro);
  
    const personagemRect = personagem.getBoundingClientRect();
    tiro.style.left = (personagemRect.left + personagemRect.width / 2) + 'px';
    tiro.style.top = (personagemRect.top + personagemRect.height / 2) + 'px';
  
    const tiroInterval = setInterval(() => {
      const tiroRect = tiro.getBoundingClientRect();
      if (tiroRect.right < window.innerWidth) {
        tiro.style.left = (parseInt(tiro.style.left) || 0) + 5 + 'px';
      } else {
        clearInterval(tiroInterval);
        document.body.removeChild(tiro);
      }
    }, 10);
  }

  
//ATIRAR ====== FIM
function updatePersonagemPosition() {
    personagem.style.left = posicaoHorizontal + 'px';
    personagem.style.top = posicaoVertical + 'px';
  }

  //colisao começo
  
  const sprite = document.getElementById('personagem');
  const enemy = document.getElementById('inimigo');

function setPosition(){  
  posicaoHorizontal = 0;
  posicaoVertical = 0;
  updatePersonagemPosition();
}


function checkCollision() {
  const personagemRect = personagem.getBoundingClientRect();
  const inimigoRect = inimigo.getBoundingClientRect();


  if (
    personagemRect.left < inimigoRect.right &&
    personagemRect.right > inimigoRect.left &&
    personagemRect.top < inimigoRect.bottom &&
    personagemRect.bottom > inimigoRect.top
  ) {
    personagem.remove;
    respawn();     
    removeVida(); 
    

  }
}
//colisao fim
  
//mexer começo
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        posicaoVertical -= step;
        break;
      case 'ArrowDown':
        posicaoVertical += step;
        break;
      case 'ArrowLeft':
        posicaoHorizontal -= step;
        break;
      case 'ArrowRight':
        posicaoHorizontal += step;
        break;
      case ' ':
        atirar();
        break;  
        
    }
  
    updatePersonagemPosition();

});

//mexer fim


//inimigo começo
const inimigo = document.getElementById('inimigo');
let inimigoPositionX = window.innerWidth; // Inimigo começa na extremidade direita

function moverInimigo() {
  inimigo.style.left = inimigoPositionX + 'px';
  inimigoPositionX -= 3; // Movimento para a esquerda

  // Reposicionar o inimigo quando ele sair da tela
  if (inimigoPositionX < -50) {
    inimigoPositionX = window.innerWidth;
    inimigo.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // Posição vertical aleatória
  } 
}
function respawnInimigo(){ 
  moverInimigo();   
    if(inimigo.remove){
      inimigoPositionX = window.innerWidth;
      inimigo.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // Posição vertical aleatória
    }
}

setInterval(moverInimigo, 10);
//inimigo fim


//colisao tiro começo


function checkTiroInimigo(){
  const tiro = document.getElementById('tiro'); // Mova esta linha para dentro da função
  if (!tiro) return; // Se o tiro não existir, retorne e não faça nada

  const tiroRect = tiro.getBoundingClientRect();
  const inimigoRect = inimigo.getBoundingClientRect();

  if (
      tiroRect.left < inimigoRect.right &&
      tiroRect.right > inimigoRect.left &&
      tiroRect.top < inimigoRect.bottom &&
      tiroRect.bottom > inimigoRect.top
  ) {         
    explosion();                  
    setTimeout(() => {
      inimigo.remove();
    }, 200);         
    tiro.remove();       
  }
}



function explosion(){
  const img = document.querySelector("#inimigo");
  img.src = "./image/explosion-gif.gif"
  

}

function checarColisoes(){
checkCollision();//Colisao entre inimigo e personagem
checkTiroInimigo();
}

setInterval(checarColisoes,50);
//colisao tiro fim

//vida começo
const character = document.getElementById('sprite')
const vidaCountElement = document.getElementById('vidaCount');

let vidaCount = 3;

function updateVidaCount() {
  vidaCountElement.textContent = vidaCount;
  if (vidaCount < 1){
    alert('Game Over! Vidas Esgotadas.')
    resetGame();
  }
}

function addVida() {
  vidaCount++;
  updateVidaCount();
}
function removeVida(){
  vidaCount--;
  updateVidaCount();
}
function respawn(){     
  setPosition(); 
  updateVidaCount();
}

function resetGame(){
  vidaCount = 3;
  updateVidaCount();
  setPosition();
}
document.addEventListener('keydown', (event) => {
  if (event.shiftKey) {
    addVida();
  }
  

});
//vida fim

//audio tiro
const backgroundAudio = new Audio('./sounds/shot.mp3'); // Substitua com o caminho do seu arquivo de som

document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    backgroundAudio.play();
  }
  
});
