let largura = window.innerWidth;
let altura = window.innerHeight * 0.9;
let tamanhoBloco = 25;

let frequencia = 0.003; //frequencia de Noise
let amplitude = 0.8; //amplitude do Noise
let seed = 0; //seed inicial Noise

let sky = "sky"
let grass = "grass"
let dirt = "dirt"
let stone = "stone"
let iron = "iron"
let diamond = "diamond"

let skyColor = '#00bfff'
let grassColor = '#99ff99'
let dirtColor = '#eba487'
let stoneColor = '#696969'
let ironColor = 'rgb(234, 234, 234)'
let diamondColor = '#73fddf'

let grassContainer = document.getElementById("grass") //variaveis para atualizar o número de itens no inventário
let dirtContainer = document.getElementById("dirt")
let stoneContainer = document.getElementById("stone")
let ironContainer = document.getElementById("iron")
let diamondContainer = document.getElementById("diamond")
let restartContainer = document.getElementById("restart")
let blocoSelecionado = grassContainer;

let grid = [] //esse array armazena os blocos que constroem o mapa

let diamondChance = 3; //chance de aparecer diamantes 
let ironChance = 5; //chance de aparecer ferro

let player = {
  inventario: {
    grass: 0,
    dirt: 0,
    stone: 0,
    diamond: 0,
    iron: 0
  },
  blocoSelecionado: grass,
}


function setup() {
  noStroke();
  setSeed();                                        
  createCanvas(largura, altura);
  desenharTerreno();  //utiliza Noise
  eventos();
  definirBlocoAtivo(grassContainer);
}

function draw() {
  atualizarInventario();
}


function eventos(){
  restartContainer.addEventListener("click", () => { //ir para a página inicial
    restart();
  })
  window.addEventListener("contextmenu", (e) => e.preventDefault()) //tirar info no clique direito do mouse
  grassContainer.addEventListener("click", () => {  //selecionar bloco desejado no inventario
    player.blocoSelecionado = "grass";
    definirBlocoAtivo(grassContainer)
  })
  dirtContainer.addEventListener("click", () => {  //selecionar bloco desejado no inventario
    player.blocoSelecionado = "dirt";
    definirBlocoAtivo(dirtContainer)
  })
  stoneContainer.addEventListener("click", () => {  //selecionar bloco desejado no inventario
    player.blocoSelecionado = "stone";
    definirBlocoAtivo(stoneContainer)
  })
  diamondContainer.addEventListener("click", () => {  //selecionar bloco desejado no inventario
    player.blocoSelecionado = "diamond";
    definirBlocoAtivo(diamondContainer)
  })
  ironContainer.addEventListener("click", () => {  //selecionar bloco desejado no inventario
    player.blocoSelecionado = "iron";
    definirBlocoAtivo(ironContainer)
  })
}

function definirBlocoAtivo(container){ //recebe como parametro qual bloco será ativo
  blocoSelecionado.classList.remove("active");
  container.classList.add("active");
  blocoSelecionado = container;
}

function restart(){ //recomeçar o mapa
  let urlRestart = window.location.href;
  window.location.href = urlRestart.substring(0, urlRestart.indexOf("/"));
}


function setSeed(){  //função para armezenar seed digitada pelo usuário
  const respostaUsuario = window.location.search; // colocar seed escolhida pelo usuário na função noise()
  const url = new URLSearchParams(respostaUsuario)
  if(url.has("seed")){
    seed = url.get("seed")
  }
  noiseSeed(seed) //função noiseSeed para geração da seed
}

function desenharTerreno(){
   for (let x = 0; x < largura; x += tamanhoBloco){ //loop para espalhar noise pela tela, o noise colocado é do tamanho do pixel 
    for (let y=0; y < altura; y += tamanhoBloco){
      let noiseValue = noise(x * frequencia, y * frequencia) * amplitude; //quanto maior o X maior frequencia, quanto maior Y maior frequencia
      let bloco = { // variavel para guardar informação sobre cada bloco
        x: x,
        y: y,
        densidade: noiseValue,
        tipoBloco: "grass"
      };
      grid.push(bloco); //array que armazena onde cada bloco está na tela e seu tipo
      let index = grid.indexOf(bloco); //localização do bloco dentro do array com método indexOf
      desenharTiles(bloco, index); //função para colocar Tile
      desenharMinerios(bloco, index); //função para colocar Tile
    }
   }
}

function desenharTiles(bloco, index){
  let {x, y, densidade} = bloco;
  let noiseAmount = densidade * y; //quanto maior o Y maior quantidade de noise
  let alturaNivel = altura - y; //definir altura do terreno para construir céu

  if (noiseAmount < alturaNivel){ //menor que a altura do terreno será ceu
    grid[index].tipoBloco = sky;
    fill(skyColor); //define "tile" do céu
    rect(x, y, tamanhoBloco, tamanhoBloco) //desenhar tile
  }

  if (noiseAmount > alturaNivel * 0.6){ //restante do código segue a mesma lógica, pintando o tile de acordo com a quantidade de noiseAmount
    grid[index].tipoBloco = grass;
    fill(grassColor); //define "tile" da grama
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }

  if (noiseAmount > alturaNivel * 0.8){
    grid[index].tipoBloco = dirt;
    fill(dirtColor); //define "tile" da terra
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }

  if (noiseAmount > alturaNivel * 2){ 
    grid[index].tipoBloco = stone;
    fill(stoneColor); //define "tile" da pedra
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }
}

function desenharMinerios(bloco, index){ //para o desenho dos minérios a lógica é um pouco diferente: pois eles tem o comportamento diferente
  let {x, y, densidade} = bloco;
  let noiseAmount = densidade * y; //quanto maior o Y maior quantidade de noise
  let alturaNivel = altura - y; //definir altura do terreno

  if (noiseAmount > alturaNivel * 2 && diamondChance > random(100)){
    grid[index].tipoBloco = diamond;
    fill(diamondColor); 
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }

  if (noiseAmount > alturaNivel * 1.5 && ironChance > random(100)){
    grid[index].tipoBloco = iron;
    fill(ironColor); 
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }
}

function atualizarInventario(){
  grassContainer.innerHTML = player.inventario.grass
  dirtContainer.innerHTML = player.inventario.dirt
  stoneContainer.innerHTML = player.inventario.stone
  ironContainer.innerHTML = player.inventario.iron
  diamondContainer.innerHTML = player.inventario .diamond
}


