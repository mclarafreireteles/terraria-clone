function movimentoJogador(){
    desenharJogador();
    movimentoEsquerda();
    movimentoDireita();
    gravidadeJogador();
  }

  function desenharJogador(){
    fill(playerColor);
    rect(player.x, player.y, tamanhoBloco, tamanhoBloco)
  }

  function gravidadeJogador(){
    if (player.y + tamanhoBloco > altura){
        player.estaCaindo = false;
        return;
    }

    let node = procurarBloco(player.x, player.y + tamanhoBloco)

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
    player.x = xJogador;
    player.y = yJogador;
  }

  