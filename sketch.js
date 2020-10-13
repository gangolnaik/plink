const Engine = Matter.Engine,
      World = Matter.World,
      Events = Matter.Events,
      Bodies = Matter.Bodies
 
var particles = [];
var plinkos=[];
var rows=[];
var particles;
var score = 0;
var gameState = "start";
var count = 0;

var engine,world;

var rowsHeight = 300;

function setup() {

  
  createCanvas(800,800);
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for(var k = 0; k<= width; k = k+80){
    rows.push(new Rows(k , height-rowsHeight/2,10,rowsHeight));
  }

  for(var j = 75; j<= width; j = j+50){
    plinkos.push(new Plinko(j ,75));
  }

  for(var j = 50; j<= width-10; j = j+50){
    plinkos.push(new Plinko(j ,175));
  }

  for(var j = 75; j<= width; j = j+50){
    plinkos.push(new Plinko(j ,275));
  }

  for(var j = 50; j<= width-10; j = j+50){
    plinkos.push(new Plinko(j ,375));
  }

}

function draw() {
  background(0);

  textSize(35);
  text("Score : " + score , 20 , 40);
  fill("white");
  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text("100",480,550);
  text("200",560,550);
  text("200",640,550);
  text("200",720,550);
  Engine.update(engine,30);  

  ground.display();
  mousePressed();

  if (gameState == "end") {
    textSize(100);
    text("Game Over", 150,250);
  }

    for(var i = 0; i < plinkos.length; i++){
      plinkos[i].display();
    }

    if (particles != null) {
      particles.display();
      if (particles.body.position.y > 760) {
        if (particles.body.position.x < 300) {
          score = score + 500;
          particles = null;
          if (count >= 5) gameState = "end";
        }
        else if (particles.body.position.x < 600 && particles.body.position.x > 301) {
          score = score + 100;
          particles = null;
          if (count >= 5) gameState = "end";            
        }
        else if(particles.body.position.x < 900 && particles.body.position.x > 601){
          score = score + 200;
          particles = null;
          if (count >= 5) gameState = "end";
        }
      }
    }
    for(var k = 0; k<rows.length;k++){
      rows[k].display();
    }
    mousePressed();
}

function mousePressed() {
  if (gameState !== "end") {
    count++;
    particles = new Particle(mouseX , 10 , 10 , 10);
  }
}