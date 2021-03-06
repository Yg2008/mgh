var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground;
var foodGroup, obstacleGroup
var score
var bg,bgImage,bgmusic;
var GameOverImg,gameover;
var sc;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg");
  bgmusic = loadSound("World's Hardest Game.wav");
  GameOverImg = loadImage("gameover.png");

  
}


 
function setup() {
  createCanvas(400,400);
  sc = 0;

  bgmusic.play();
  bgmusic = true;
  
  bg = createSprite(0,0,600,600);
  bg.addImage(bgImage);
  score = 0;
  bg.velocityX = -2;
  bg.x = bg.width/2;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.visible = false;
  
  gameover = createSprite(150,200);
  gameover.addImage(GameOverImg);
  gameover.visible = false;
  
  console.log(ground.x);
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  
  stroke("black");
  textSize(20);
  fill("black");
  score = Math.round(frameCount/frameRate());


  
  
  bg.depth = score.depth;
  score.depth = score.depth + 1;
  
  if(bg.x<0){
  bg.x = bg.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 200){
    monkey.velocityY = -13; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  food();
  spawnObstacles();
  
  if(monkey.isTouching(foodGroup)){
    sc = sc+5;
    foodGroup.destroyEach();
    monkey.scale = monkey.scale + 0.001;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    sc = sc-2;
    monkey.scale = monkey.scale - 0.001;
  } 
  
  if(sc <= -1){
    gameover.visible = true;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(0);
    bg.velocityX = 0;
    monkey.velocityY = 0;

  }
  
 drawSprites(); 
  text("Survival Time: " + score,125,50);
  text("Score:"+sc,135,70);
}

function food(){
  if(frameCount % 150 === 0){
    banana = createSprite(600,100,20,20)
    banana.y = Math.round(random(120,200))
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.1;
    banana.lifeime = 200;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    foodGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
   obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -4;
    var r = Math.round(random(1));
    
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.lifetime = 300;
  
  obstacleGroup.add(obstacle); 
       
    }
            
    
  }






