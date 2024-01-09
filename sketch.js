
var PLAY = 1;
var END = 0;
var GameState=PLAY;
var trex ,trex_running, edges, trex_collided;
var ground, invisibleGround, ground_image;

var cloud, cloudsGroup, cloudImage;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obcstacle5, obstacle6;
var gravity, vspawnObstacle, vspawnClouds;
var score, GameState, Health;
var sleighGroup;
function preload () {
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png"); 
  sleighImage= loadImage("Sleigh1.png","Sleigh2.png","Sleigh3.png","Sleigh4.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  trex = createSprite(50,10,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  vspawnObstacle = 50;
  vspawnClouds = 120;
  Health = 3.8;
  
  gravity = 0.75;

  ground = createSprite(50,189,600,30);
  ground.addImage("ground",ground_image);
  ground.scale=2;
  ground.x = ground.width/2;
  ground.velocityX = -4;
  ground.depth = 1;
  ground.x=trex.depth+1;
  trex.depth=trex.depth +1;


  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300,100);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  invisibleGround = createSprite(200,190,400,0);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  sleighGroup= new Group();
  score = 0;

}

function draw(){
  background("#00A2E8");
  text("Score: "+ score, 500,50);
  text("Health: " + Health, 400, 50)
  
  
  if (GameState===PLAY){
    ground.velocityX = -(6 + floor(score/10));
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -4*Math.sqrt(Health*3);
    }
  
    trex.velocityY = trex.velocityY + gravity;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
      gravity = gravity + random(-0.1,0.1);
      if (score >= 100){
        Health = Health + 1;
        }
      else {
          Health = Health + round(Math.sqrt(score)*20)/1000;
       }
      }
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    spawnSleigh();
    if(obstaclesGroup.isTouching(trex)){
       Health = round((Health - 0.05)*1000)/1000;
    }
    if(Health <= 0){
       GameState = END;
    }
  }
  else if (GameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    sleighGroup.setVelocityXEach(0);
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    sleighGroup.setLifetimeEach(-1)
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

 function spawnObstacles(){

  if (frameCount % vspawnObstacle === 0){
    var obstacle = createSprite(650,175,10,40);
    vspawnObstacle = vspawnObstacle + round(random(-1.5,1.5))
    obstacle.velocityX =  -(6 + floor(score/10));
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
             break;
      case 2: obstacle.addImage(obstacle2);
             break;
      case 3: obstacle.addImage(obstacle3);
             break;
      case 4: obstacle.addImage(obstacle4);
             break;
      case 5: obstacle.addImage(obstacle5);
             break;
      case 6: obstacle.addImage(obstacle6);
             break;
      default: break;
    }
    
    obstacle.scale = random(0.5,0.8);
    obstacle.lifetime = 500;
    obstaclesGroup.add(obstacle)
    score = score+1;
  }
 }

 function spawnClouds() {
   if (frameCount % vspawnClouds === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,30));
    cloud.addImage(cloudImage);
    cloud.scale = random(0.35,0.65);
    cloud.velocityX = -(3+floor(score/30));
    vspawnClouds = vspawnClouds+round(random(-2,2));

      cloud.lifetime = 200;

      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;
      cloudsGroup.add(cloud)
   }
 }


 function spawnSleigh() {
  if (frameCount % 400==0) {
   sleigh = createSprite(600,100,40,10);
   
   sleigh.y = Math.round(random(10,30));
   sleigh.addImage(sleighImage);
   sleigh.scale = 0.085;
   sleigh.velocityX = -3;
   

   sleigh.lifetime = 200;

  sleigh.depth = trex.depth;
  sleigh.depth = trex.depth + 1;
  sleighGroup.add(sleigh)
  }
}

function reset(){
  GameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  sleighGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  Health = 3.8;
  
}