function movimentoJogador(){
    desenharJogador();
    movimentoDireita();
    movimentoEsquerda();
    gravidadeJogador();
    if (!player.estaCaindo){
        puloJogador();
    }
  }

  function desenharJogador(){
    fill(playerColor);
    rect(player.x, player.y, tamanhoBloco, tamanhoBloco)
  }

  function puloJogador() {
    for (let i = 0; i < alturaPulo; i++) {
      let node = procurarBloco(player.x, player.y - tamanhoBloco);
      if (keyIsDown(UP_ARROW) && procurarBloco(player.x, player.y - tamanhoBloco).tipoBloco === sky) {
        updatePlayerPosition(player.x, player.y - tamanhoBloco);
      }
    }
  }
  

  function gravidadeJogador(){
    if (player.y + tamanhoBloco > altura){
        player.estaCaindo = false;
        return;
    }

    let node = procurarBloco(player.x, player.y + tamanhoBloco);
    if (node.tipoBloco === sky){
        player.estaCaindo = true;
        movimentar(player.x, player.y + tamanhoBloco);
    } else {
        player.estaCaindo = false;
    }
  }
  
  function movimentoDireita(){
    if(player.x + tamanhoBloco > largura){
        return;
    }
    if(
        keyIsDown(RIGHT_ARROW) && procurarBloco(player.x + tamanhoBloco, player.y).tipoBloco === sky
    ){
        movimentar(player.x + tamanhoBloco, player.y)
    }
  }
  
  function movimentoEsquerda(){
    if (player.x - tamanhoBloco < 0){
        return;
    }
    if(
        keyIsDown(LEFT_ARROW) && procurarBloco(player.x - tamanhoBloco, player.y).tipoBloco === sky
    ){
        movimentar(player.x - tamanhoBloco, player.y)
    }
  }

  function procurarBloco(x, y){  //checar se o bloco que ele quer se movimentar é do tipo sky
    let blocoX = x - (x % tamanhoBloco);
    let blocoY = y - (y % tamanhoBloco);
    for (let i = 0; i < grid.length; i++){
        if (grid[i].x === blocoX && grid[i].y === blocoY){
            return grid[i];
        }
    }
  }

  function movimentar(xJogador, yJogador){
    posicaoAnterior(); //função para corrigir o erro de gerar "trilha" quando o jogador se movimenta
    player.x = xJogador;
    player.y = yJogador;
    atualizarPosicao();
  }

  function posicaoAnterior(){
    fill(skyColor)
    rect(player.x, player.y, tamanhoBloco, tamanhoBloco )
  }

  function atualizarPosicao(){
    fill(playerColor)
    rect(player.x, player.y, tamanhoBloco, tamanhoBloco )
  }