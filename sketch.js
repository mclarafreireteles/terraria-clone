let largura = window.innerWidth;
let altura = window.innerHeight * 0.9;
let tamanhoBloco = 25;
let alturaPulo = 3;


let frequencia = 0.003
let amplitude = 0.8;
let seed = 0;

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

let grassContainer = document.getElementById("grass")
let dirtContainer = document.getElementById("dirt")
let stoneContainer = document.getElementById("stone")
let ironContainer = document.getElementById("iron")
let diamondContainer = document.getElementById("diamond")
let restartContainer = document.getElementById("restart")
let blocoSelecionado = grassContainer;

let grid = []

let diamondChance = 2;
let ironChance = 4;

let player = {
  x: 50,
  y: 0,
  estaCaindo: false,
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
  frameRate(15);
  setSeed();
  createCanvas(largura, altura);
  desenharTerreno();
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

function restart(){
  let urlRestart = window.location.href;
  window.location.href = urlRestart.substring(0, urlRestart.indexOf("/"));
}


function setSeed(){
  const respostaUsuario = window.location.search; // colocar seed escolhida pelo usuário na função noise()
  const url = new URLSearchParams(respostaUsuario)
  if(url.has("seed")){
    seed = url.get("seed")
  }
  noiseSeed(seed)
  randomSeed(seed)
}

function desenharTerreno(){
   for (let x = 0; x < largura; x += tamanhoBloco){
    for (let y=0; y < altura; y += tamanhoBloco){
      let noiseValue = noise(x * frequencia, y * frequencia) * amplitude;
      let node = {
        x: x,
        y: y,
        densidade: noiseValue,
        blockType: "terrain"
      };
      grid.push(node);
      let index = grid.indexOf(node);
      paintTerrainTiles(node, index);
      paintMinerios(node, index);
    }
   }
}

function paintTerrainTiles(node, index){
  let {x, y, densidade} = node;
  let noiseAmount = densidade * y; //quanto maior o Y maior quantidade de noise
  let alturaNivel = altura - y; //definir altura do terreno

  if (noiseAmount < alturaNivel){ //menor que a altura do terreno será ceu
    grid[index].tipoBloco = sky;
    fill(skyColor); //define "tile" do céu
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }

  if (noiseAmount > alturaNivel * 0.6){ //restante do código segue a mesma lógica, pintando o tile de acordo com a quantidade de noiseAmount
    grid[index].tipoBloco = grass;
    fill(grassColor); //define "tile" do céu
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }

  if (noiseAmount > alturaNivel * 0.8){ //menor que a altura do terreno será ceu
    grid[index].tipoBloco = dirt;
    fill(dirtColor); //define "tile" do céu
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }

  if (noiseAmount > alturaNivel * 2){ //menor que a altura do terreno será ceu
    grid[index].tipoBloco = stone;
    fill(stoneColor); //define "tile" do céu
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }
}

function paintMinerios(node, index){
  let {x, y, densidade} = node;
  let noiseAmount = densidade * y; //quanto maior o Y maior quantidade de noise
  let alturaNivel = altura - y; //definir altura do terreno

  if (noiseAmount > alturaNivel * 2 && diamondChance > random(100)){ //menor que a altura do terreno será ceu
    grid[index].tipoBloco = diamond;
    fill(diamondColor); //define "tile" do céu
    rect(x, y, tamanhoBloco, tamanhoBloco)
  }

  if (noiseAmount > alturaNivel * 1.5 && ironChance > random(100)){ //menor que a altura do terreno será ceu
    grid[index].tipoBloco = iron;
    fill(ironColor); //define "tile" do céu
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
