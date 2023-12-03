function mousePressed(){
    let tile = procurarBloco(mouseX, mouseY);

    if (tile){
      interagirBloco(tile);
      console.log('interação com bloco')
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
  
  function interagirBloco(tile){
    if (mouseButton == RIGHT && tile.tipoBloco === sky) {
        console.log('botao direito pressionado')
        colocarBloco(tile);
    }
    if (mouseButton === LEFT && tile.tipoBloco !== sky){
      quebrarBloco(tile);
      console.log('botao esquerdo pressionado')
      return;
    }
    
  }
  
  function quebrarBloco(tile){
    let tipoBloco = tile.tipoBloco;

    addInventario(tipoBloco);
    desenharTipoBloco(tile, sky);
  }
  
  function addInventario(tipoBloco){
    switch (tipoBloco){
      case grass:
        player.inventario.grass++;
        break;
      case dirt:
        player.inventario.dirt++
        break;
      case stone:
        player.inventario.stone++
        break;
      case iron:
        player.inventario.iron++
        break;
      case diamond:
        player.inventario.diamond++
        break;
      default:
        break;
    }
  }
  
  function desenharTipoBloco(tile, tipoBloco){
    tile.tipoBloco = tipoBloco;
    fill(getCor(tipoBloco));
    rect(tile.x, tile.y, tamanhoBloco, tamanhoBloco)
  }
  
  function getCor(tipoBloco){
    switch (tipoBloco){
      case sky:
        return skyColor;
      case grass:
        return grassColor
      case dirt:
        return dirtColor;
      case stone:
        return stoneColor;
      case iron:
        return ironColor;
      case diamond:
        return diamondColor;
      default:
        return skyColor;
    }
  }

  function colocarBloco(tile){
    let tipoBloco = player.blocoSelecionado;

    if (podeColocar(tipoBloco)) {
        player.inventario[tipoBloco]--
        desenharTipoBloco(tile, tipoBloco)
        console.log('colocando bloco')
    }
  }

  function podeColocar(tipoBloco){
    switch (tipoBloco) {
        case grass:
          return player.inventario.grass > 0;
        case dirt:
          return player.inventario.dirt > 0;
        case stone:
          return player.inventario.stone > 0;
        case diamond:
          return player.inventario.diamond > 0;
        case iron:
          return player.inventario.iron > 0;
        default:
          return false;
      }
  }