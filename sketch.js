var city, cityImage;
var kangaroo, kangarooImage;
var ground;
var prize, prizeImage;
var stone, stoneImage;
var prizeGroup, obstacleGroup;
var score = 0;
var gameState = "play";



function preload() {
  cityImage = loadImage("city.jpg");
  kangarooImage = loadImage("kangaroo-1.png");
  prizeImage = loadImage("prize.jpg");
  stoneImage = loadImage("stone.png");

}



function setup() {
  createCanvas(510, 500);

  city = createSprite(200, 240);
  city.scale = 1.1;
  city.addImage(cityImage);


  kangaroo = createSprite(100, 360);
  kangaroo.scale = 0.15;
  kangaroo.addImage(kangarooImage);

  ground = createSprite(370, 480, 600, 10);
  //ground.velocityX = -10;
  ground.visible = false;

  obstacleGroup = new Group();
  prizeGroup = new Group();
  score = 0;
}



function draw() {

  background("pink");

  if (gameState === "play") {
    if (keyDown("space")) {
      kangaroo.velocityY = -12;
    }
    kangaroo.velocityY = kangaroo.velocityY + 0.8;

    if (city.x < 0) {
      city.x = city.width / 2;
    }
    city.velocityX = -5;

    spawnPrize();
    spawnObstacle();

    for (var i = 0; i < prizeGroup.length; i++) {
      if (prizeGroup.get(i).isTouching(kangaroo)) {
        prizeGroup.get(i).destroy();
        score = score + 10;
      }
    }

    if (obstacleGroup.isTouching(kangaroo)) {
      city.velocityX = 0;
      gameState = "end";
    }

    if(score>=1000){
    gameState="win";  
    }
  }

  kangaroo.collide(ground);

  drawSprites();

  if (gameState === "end") {
    stroke("black");
    textSize(20);
    fill("black");
    text("GAME OVER : To restart press R ", 100, 200);
    obstacleGroup.setVelocityXEach(0);
    prizeGroup.setVelocityXEach(0);
    kangaroo.velocityY = 0;
    if (keyDown("r")) {
      reset();
    }

  }

  if(gameState==="win"){
    stroke("black");
    textSize(20);
    fill("black");
    text("You win: To restart press R ", 100, 200);
    obstacleGroup.setVelocityXEach(0);
    prizeGroup.setVelocityXEach(0);
    kangaroo.velocityY = 0;
    if (keyDown("r")) {
      reset();
    }
  }

  stroke("black");
  textSize(25);
  fill("black");
  text("SCORE: " + score, 300, 50);
}



function spawnPrize() {
  if (frameCount % 80 === 0) {
    prize = createSprite(500, 380, 40, 10);
    prize.addImage(prizeImage);
    prize.scale = 0.15;
    prize.setCollider("circle", 0, 0, 40)
    prize.debug = false;
    prize.velocityX = -4;
    prize.y = Math.round(random(100, 300));
    prize.lifetime = 300;
    kangaroo.depth = prize.depth + 1;
    prizeGroup.add(prize);
  }
}

function spawnObstacle() {
  if (frameCount % 100 === 0) {
    stone = createSprite(650, 460, 0, 0);
    stone.addImage(stoneImage);
    stone.scale = 0.15;
    stone.debug = false;
    stone.velocityX = -4;
    stone.lifetime = 300;
    kangaroo.depth = stone.depth + 1;
    obstacleGroup.add(stone);
  }
}



function reset() {
  gameState = "play";
  score = 0;
  obstacleGroup.destroyEach();
  prizeGroup.destroyEach();

}