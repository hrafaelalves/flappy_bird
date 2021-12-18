console.log("[Meu primeiro game] Flappy Bird");

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
  positionY: 204,
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
  }
}

const flappyBird = {
  sourceX: 0,
  sourceY: 0,
  width: 33,
  height: 24,
  positionX: 10,
  positionY: 50,
  draw(){
    context.drawImage(
      sprites, // image
      flappyBird.sourceX, flappyBird.sourceY, // source x, source y
      flappyBird.width, flappyBird.height, // width, height (cut size on the sprite)
      flappyBird.positionX, flappyBird.positionY, // position x and y to draw on canvas
      flappyBird.width, flappyBird.height, // width, height (cut size on the canvas)
    );
  }
}
  
// loop that creates game frames per second;
function loop(){
  background.draw();
  floor.draw();
  flappyBird.draw();

  // flappyBird.positionY = flappyBird.positionY + 1;

  requestAnimationFrame(loop);
}

loop();