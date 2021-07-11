  var canvas, backgroundImage,roadimg,road,doracake,doracakeimg,
  doremon,doremonimg,bgimg,obstacle,rat,car,stone,ground,groundimg,obstaclesGroup,GameState=1,doracakeGroup,gameover,
  gameoverimg,restart,restartimg,doremonimg2,score=0,invisibleGround,revivingSound,overSound,eatingSound;

  function preload(){
    doracakeimg = loadImage("doracake.png");
    doremonimg=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");
    bgimg=loadImage("bg.png");
    rat=loadImage("rat.png");
    car=loadImage("car.png");
    stone=loadImage("obstacle.png");
    gameoverimg=loadImage("gameOver.png");
    restartimg=loadImage("restart.png");
    doremonimg2=loadAnimation("3.png");
    groundimg=loadImage("ground.png");
    revivingSound=loadSound("reviving.wav");
    overSound=loadSound("over.wav");
    eatingSound=loadSound("eating.wav");
  }

  function setup(){
    canvas = createCanvas(1400, 700);
    fill("white");
    invisibleGround=createSprite(700,630,2100,20);
    ground = createSprite(700,640);
    ground.scale=1.8;
    ground.addImage(groundimg);
    doremon=createSprite(100,630);
    doremon.addAnimation("running",doremonimg);
    doremon.addAnimation("stop",doremonimg2);
    doremon.scale=0.7;
    gameover=createSprite(700,300);
    gameover.addImage(gameoverimg);
    gameover.scale=0.8;
    restart=createSprite(700,350);
    restart.addImage(restartimg);
    restart.scale=0.8;
    obstaclesGroup=new Group ();
    doracakeGroup=new Group ();
    
  }
  function draw(){
  background(bgimg);
  if(GameState===1){
  createObstacles();
  ground.velocityX=-6;
  createDoracakes();
  if(doracakeGroup.isTouching(doremon)){
  doracakeGroup[0].destroy();
  score=score+1;
  eatingSound.play();
  }
  gameover.visible=false;
  restart.visible=false;
  if(ground.x<400){
  ground.x=ground.width/2;
  }
  if(keyDown("space")&&doremon.y>500){
  doremon.velocityY=-12;}
  doremon.velocityY=doremon.velocityY+0.3;
  if(obstaclesGroup.isTouching(doremon)){
  GameState=0;
  doremon.velocityY=0;
  overSound.play();
  }}
  if(GameState===0){
  doremon.changeAnimation("stop",doremonimg2);
  obstaclesGroup.setVelocityXEach(0);
  doracakeGroup.setVelocityXEach(0);
  ground.velocityX=0;
  gameover.visible=true;
  restart.visible=true;
  obstaclesGroup.setLifetimeEach(0);
  doracakeGroup.setLifetimeEach(0);
    score=0;
  if(mousePressedOver(restart)){
  GameState=1;
  doremon.changeAnimation("running",doremonimg);
  revivingSound.play();
  
  }
  }
  doremon.collide(invisibleGround);
  fill("white");
  textSize(20);
  text("Score:"+score,1300,50);
  drawSprites();
  }
  function createObstacles(){
  if(frameCount%200===0){
    obstacle=createSprite(1400,600);
  var number=Math.round(random(1,3));

  obstacle.velocityX=-6;
  switch(number){
  case 1:obstacle.addImage("1",rat);
  obstacle.scale=0.2;
        break;
  case 2:obstacle.addImage("2",stone);
  obstacle.scale=0.2;
        break;      
  case 3:obstacle.addImage("3",car);
  obstacle.scale=0.5;
        break;
  default:break;
  }
  obstacle.lifetime=250
  obstaclesGroup.add(obstacle);
  }}
  function createDoracakes(){
    if(frameCount%100===0){
  doracake=createSprite(1400,300)
  doracake.addImage(doracakeimg);
  doracake.velocityX=-6;
  doracake.lifetime=250; 
  doracake.scale=0.15;
  doracakeGroup.add(doracake); 
  }
  }
