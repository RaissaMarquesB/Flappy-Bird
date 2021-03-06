console.log('[DevSoutinho] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/efeitos_hit.wav';

const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
          );

          contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
          );
    },
};

// [Chao]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );

      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );

    },
  };

//[CHAO]
function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y:canvas.height - 112,
        atualiza(){

        },
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            )
        }
    }
}

function fazColisao(flappyBird, chao){
 const flappyBirdY = flappyBird.y + flappyBird.altura;
 const chaoY = chao.y;

if(flappyBirdY >= chaoY){
    return true;
}
    return false;

}

function criaFlappyBird(){
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula(){
    console.log('devo pular');
    flappyBird.velocidade = - flappyBird.pulo
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        if(fazColisao(flappyBird, chao)){
            console.log('Fez colisao');
            som_HIT.play();

            setTimeout(() => {
                mudaParaTela(Telas.GAME_OVER);
            }, 500);
            return;
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    movimentos: [
        { spriteX:0, spriteY:0, }, //asa cima
        { spriteX:0, spriteY:26, }, //asa meio
        { spriteX:0, spriteY:52, }, //asa baixo
    ],
    frameAtual: 0,
    atualizaOFrameAtual(){
        const intervaloDeFrames =10;
        const passouOIntervalo = frames % intervaloDeFrames === 0;

        if(passouOIntervalo){
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao
        }
    },

    desenha(){
        flappyBird.atualizaOFrameAtual()
        const{ spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
        contexto.drawImage(
            sprites,
            spriteX, spriteY, // sprite X e Y
            flappyBird.largura, flappyBird.altura, // tamanho do recorte da imagem 
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    }
}
    return flappyBird;
}

//[mensagemGetReady]
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    }
}

//[mensagem Game Over]
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 225,
    h: 200,
    // formula pra centralizar
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX,mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x,mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
    }
}


function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
    espaco: 80,
    desenha() {

        canos.pares.forEach(function(par){
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;
        // [Cano do C??u]
        contexto.drawImage(
            sprites,
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canoCeuX, canoCeuY,
            canos.largura, canos.altura,
        )
            // [Cano do Chao]
            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
            )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
            }
        })
        },
        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
                //console.log('Flappy bird invadiu a area')
                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
            return false;
        },
        pares: [],
        atualiza(){
            const passou100Frames = frames % 100 === 0;

            if(passou100Frames) {
                console.log('passou 100 frames')
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par){
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)){
                    console.log('voce perdeu')
                    som_HIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                }

                if(par.x + canos.largura <= 0){
                    //remove primeiro elemento do array
                    canos.pares.shift();

                }
            });
            
        }
 }
    return canos;
}

function criaPlacar(){
    const placar = {
        pontuacao: 0,
        desenha(){
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white'
            contexto.fillText(`aaaaaa${placar.pontuacao}`, canvas.width - 10, 35);
        },
        atualiza(){
            //controlar tempo contabilizado no jogo
            const intervaloDeFrames = 60;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            if(passouOIntervalo) {
            placar.pontuacao = placar.pontuacao + 1
            }
        }
    }
    return placar;
}


// [Telas]
function inicializa(){}
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){
telaAtiva = novaTela;

if(telaAtiva.inicializa){
    telaAtiva.inicializa();
  }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.canos = criaCanos();
            chao.desenha();

        },
        desenha() {
        planoDeFundo.desenha();
        globais.flappyBird.desenha();
        chao.desenha();
        mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {

            const repeteEm = chao.largura / 2;
            if (chao.x <= - repeteEm){
              return chao.x=0
            }
            chao.x = chao.x - 1;
            globais.canos.atualiza();
          },
    }
};

Telas.JOGO = {
    inicializa(){
        globais.placar = criaPlacar();
    },
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.canos.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
        const repeteEm = chao.largura / 2;
        if (chao.x <= - repeteEm){
              return chao.x=0
            }
        chao.x = chao.x - 1;
    }
};

Telas.GAME_OVER ={
    desenha(){
        mensagemGameOver.desenha();
    },
    atualiza(){

    },
    // QUANDO CLICAR MUDA A TELA !!!!!!!!!!!!!!
    click(){
        mudaParaTela(Telas.INICIO);
    }
}

function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);

}

window.addEventListener('click', function(){
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});

//return flappyBird;
mudaParaTela(Telas.INICIO);
loop();