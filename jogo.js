console.log("[Meu primeiro game] Flappy Bird");

let frames = 0;
const hitSound = new Audio();
hitSound.src = './efects/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const background = {
  sourceX: 390,
  sourceY: 0,
  width: 275,
  height: 204,
  positionX: 0,
  positionY: canvas.height - 204,
  draw(){
    context.fillStyle = '#70c5ce';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      sprites, // image
      background.sourceX, background.sourceY, // source x, source y
      background.width, background.height, // width, height (cut size on the sprite)
      background.positionX, background.positionY, // position x and y to draw on canvas
      background.width, background.height, // width, height (cut size on the canvas)
    );

    context.drawImage(
      sprites, // image
      background.sourceX, background.sourceY, // source x, source y
      background.width, background.height, // width, height (cut size on the sprite)
      (background.positionX + background.width), background.positionY, // position x and y to draw on canvas
      background.width, background.height, // width, height (cut size on the canvas)
    );
  }
}

function createFloor(){
  const floor = {
    sourceX: 0,
    sourceY: 610,
    width: 224,
    height: 112,
    positionX: 0,
    positionY: canvas.height - 112,
    draw(){
      context.drawImage(
        sprites, // image
        floor.sourceX, floor.sourceY, // source x, source y
        floor.width, floor.height, // width, height (cut size on the sprite)
        floor.positionX, floor.positionY, // position x and y to draw on canvas
        floor.width, floor.height, // width, height (cut size on the canvas)
      );

      context.drawImage(
        sprites, // image
        floor.sourceX, floor.sourceY, // source x, source y
        floor.width, floor.height, // width, height (cut size on the sprite)
        (floor.positionX + floor.width), floor.positionY, // position x and y to draw on canvas
        floor.width, floor.height, // width, height (cut size on the canvas)
      );
    },
    update(){
      const floorMove = 1;
      const movement = floor.positionX - floorMove;
      
      const repeatWhen = floor.width / 2;

      floor.positionX = movement % repeatWhen;
    }
  };

  return floor;
}

function makeCollision(flappyBird, floor){
  const flappyBirdY = flappyBird.positionY + flappyBird.height;
  const floorY = floor.positionY;

  if(flappyBirdY >= floorY){
    return true;
  }

  return false;
}

function createFlappyBird(){
  const flappyBird = {
    sourceX: 0,
    sourceY: 0,
    width: 33,
    height: 24,
    positionX: 10,
    positionY: 50,
    velocity: 0,
    gravity: 0.25,
    jumpPower: 4.6,
    moves: [
      { sourceX: 0, sourceY: 0 },
      { sourceX: 0, sourceY: 26 },
      { sourceX: 0, sourceY: 52 },
      { sourceX: 0, sourceY: 26 },
    ],
    currentFrame: 0,
    updateCurrentFrame(){
      const frameInterval = 10;
      const passedInverval = frames % frameInterval === 0;
      if(passedInverval){
        const incrementBase = 1;
        const increment = incrementBase + flappyBird.currentFrame;
        const repeatBase = flappyBird.moves.length;
        
        flappyBird.currentFrame = increment % repeatBase;
      }
    },
    draw(){
      flappyBird.updateCurrentFrame();
      const { sourceX, sourceY } = flappyBird.moves[flappyBird.currentFrame];

      context.drawImage(
        sprites, // image
        sourceX, sourceY, // source x, source y
        flappyBird.width, flappyBird.height, // width, height (cut size on the sprite)
        flappyBird.positionX, flappyBird.positionY, // position x and y to draw on canvas
        flappyBird.width, flappyBird.height, // width, height (cut size on the canvas)
      );
    },
    jump(){
      flappyBird.velocity = - flappyBird.jumpPower;
    },
    update(){
      if(makeCollision(flappyBird, globals.floor)){
        hitSound.play();

        changeScreen(screens.BEGIN);
        return;
      }
  
      flappyBird.velocity = flappyBird.velocity + flappyBird.gravity;
      flappyBird.positionY = flappyBird.positionY + flappyBird.velocity;
    }
  };

  return flappyBird;
}
  
const messageGetReady = {
  sourceX: 134,
  sourceY: 0,
  width: 174,
  height: 152,
  positionX: (canvas.width / 2) - (174 / 2),
  positionY: 50,
  draw(){
    context.drawImage(
      sprites, // image
      messageGetReady.sourceX, messageGetReady.sourceY, // source x, source y
      messageGetReady.width, messageGetReady.height, // width, height (cut size on the sprite)
      messageGetReady.positionX, messageGetReady.positionY, // position x and y to draw on canvas
      messageGetReady.width, messageGetReady.height, // width, height (cut size on the canvas)
    );
  }
}

const globals = {};
let activedScreen = {};

function changeScreen(newScreen){
  activedScreen = newScreen;

  if(activedScreen.init){
    activedScreen.init();
  }
}

const screens = {
  BEGIN: {
    init(){
      globals.flappyBird = createFlappyBird();
      globals.floor = createFloor();
    },
    draw(){
      background.draw();
      globals.floor.draw();
      messageGetReady.draw();
      globals.flappyBird.draw();
    },
    click(){
      changeScreen(screens.GAME);
    },
    update(){
      globals.floor.update();
    }
  },
  GAME: {
    draw(){
      background.draw();
      globals.floor.draw();
      globals.flappyBird.draw();
    },
    click(){
      globals.flappyBird.jump();
    },
    update(){
      globals.flappyBird.update();
      globals.floor.update();
    }
  }
}

// loop that creates game frames per second;
function loop(){
  activedScreen.draw();
  activedScreen.update();

  frames++;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
  if(activedScreen.click){
    activedScreen.click();
  }
});

changeScreen(screens.BEGIN);
loop();