
//Global Variable

var miner,miner_Image;

var obstacles,obstacles_Image ; 

var zombies , zombies_Image;

var background , background_Image;

var restart , restart_Image;

var gameover , gameover_Image;

var score;

var healthbar=5,healthbarImage;
var health1,health2,health3,health4,health5;

var jumpSound , checkPointSound, dieSound;

var PLAY=1;
var End=0;
var gameState=PLAY;

function preload(){
  
  miner_Image = loadImage("Minerimage.png");
  
  zombies_Image = loadImage("Zombies.png");
  
  Stone_Image = loadImage("Stone.png");
  
  background_Image =        loadImage("Backgroundimage.jpg");
  
  restart_Image = loadImage("RestartImage.png");
  
  gameover_Image = loadImage("GameoverImage.png");
  
  healthbarImage= loadImage("healthbarImage.png");
  
   jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  
}

function setup() {
  
  createCanvas(400, 400);
  
  background1 = createSprite(200,200,400,400);
  background1.addImage(background_Image);
  background1.scale=1.2;
  background1.x=background1.width/2;
  background1.velocityX=-4;
  
  miner = createSprite(70,180,20,50);
  miner.addAnimation("running",miner_Image);
  miner.scale=0.7;
  miner.setCollider("rectangle",0,0,5,170);  
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width/2;
  ground.velocityX =-4;
  ground.y=410;
  ground.width=600;
  ground.shapeColor="black";
  
  zombiesGroup = new Group();
  
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameover=createSprite(200,100);
  gameover.addImage(gameover_Image);
  gameover.visible=false;
  gameover.scale=0.5;
  
  restart=createSprite(210,210);
  restart.addImage(restart_Image);
  restart.visible=false;
  restart.scale=0.5; 
  
  health1 = createSprite(37,130,30,30);
     health1.addImage("health",healthbarImage);
     health1.scale=0.5
  health2 = createSprite(80,130,30,30);
     health2.addImage("health",healthbarImage);
     health2.scale=0.5
 health3 = createSprite(123,130,30,30);
     health3.addImage("health",healthbarImage);
     health3.scale=0.5
 health4 = createSprite(165,130,30,30);
     health4.addImage("health",healthbarImage);
     health4.scale=0.5
 health5 = createSprite(209,130,30,30);
     health5.addImage("health",healthbarImage);
     health5.scale=0.5
  
}

function draw() {
  background(220);
  
  miner.collide(ground);
  
  if(gameState===PLAY){
    
 spawnObstacles();
    
 spawnZombies();
    
   if(touches.length>0 || keyDown("space")&&miner.y>339){
    
      miner.velocityY=-15;
     
     jumpSound.play();
     
     touches=[] 
    
  }
    
    console.log("HealthBar" + healthbar)
     if(healthbar === 4){
       health1.visible = true;
       health2.visible = true
       health3.visible = true;
       health4.visible = true;
       health5.visible= false;
     }
    
    
    if(healthbar === 3){
       health1.visible = true;
       health2.visible = true;
       health3.visible = true;
       health4.visible = false;
       health5.visible= false;
     }
    
    if(healthbar === 2){
       health1.visible = true;
       health2.visible = true;
       health3.visible =false ;
       health4.visible =false;
       health5.visible= false ;
     }
    
    if(healthbar === 1){
       health1.visible = true;
       health2.visible = false;
       health3.visible = false;
       health4.visible = false;
       health5.visible= false;
     }
    
    if(healthbar === 0){
       health1.visible = false;
       health2.visible = false
       health3.visible = false;
       health4.visible = false;
       health5.visible= false;
      gameState= End;
     }
    if(healthbar===5){
      
      health1.visible=true;
      health2.visible=true;
      health3.visible=true; 
      health4.visible=true; 
      health5.visible=true;
      
    }
    
      if(frameCount%10===0){
  
  score = score+1;
  
  }
  
  miner.velocityY = miner.velocityY+0.8;
    
   if (ground.x < 0){
   
   ground.x = ground.width/2;
   
 }
    
     
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    
    if(background1.x<100){
    background1.x=background1.width/2;
  }
    
     ground.velocityX =-(4+3*score/100);
    
     background1.velocityX=-4;
    
    if(zombiesGroup.isTouching(miner)){
      
      zombiesGroup.destroyEach();
      healthbar=healthbar-1;
       dieSound.play()
      
    }
    
   if(obstaclesGroup.isTouching(miner)){
   gameState=End
   dieSound.play();
  } 
  }
   else if(gameState===End){
   
  gameover.visible=true;
  restart.visible=true;
  ground.velocityX=0;
  miner.velocityX=0;
  miner.velocityY=0;
  background1.velocityX=0;
  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);  
  zombiesGroup.setVelocityXEach(0);
  zombiesGroup.setLifetimeEach(-1);
     
   }
  
  if(mousePressedOver(restart)){
  reset();
  }
  
  drawSprites()
  
  
  //Display Score
  stroke("white"); 
  textSize("20");
  fill("white");
  text("Score:"+score,100,50);
  
  //Display Text 
  text("Healthbar:"+healthbar,20,120)
}

function reset(){
  
  gameState = PLAY;

gameover.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
zombiesGroup.destroyEach();
score=0; 
healthbar=5;
}

//Write the function to spawn the obstacles

function spawnObstacles(){

  if(frameCount%300===0){
     
 var obstacles = createSprite(400,375,10,10);
 obstacles.velocityX=-4;
 obstacles.addImage("obstacles",Stone_Image);
    
 //Assign Lifetime and scale to the obstacles    
 obstacles.scale=0.3;
 obstacles.lifetime=300;
    
 //Add each obstacle to the group
    obstaclesGroup.add(obstacles);
     
     }

}

//Write the function to spawn Zombies

function spawnZombies(){
  
  if(frameCount%200===0){
    
 var zombies= createSprite(400,375,10,10);
 zombies.velocityX=-4;
 zombies.addImage("zombies",zombies_Image);
    
 //Assign Lifetime and Scale
    
    zombies.scale=0.2;
    zombies.lifetime=300;
    
 //Add each zombies to the group
    
    zombiesGroup.add(zombies);
    
  }
  
}
