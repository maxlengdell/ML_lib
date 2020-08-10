var screens = 10;
var savedScreens = [];

 
// save this file as sketch.js
// Sketch One
for(let k = 0; k < screens ;k++){
  // Sketch Two
  var t = function( p ) { 
    var snake;
    var population = 1;
    var counter = 0;
    var food;
    p.setup = function() {
        console.log("setup");
        p.createCanvas(200, 200);
        x = Math.ceil(Math.random(0,p.width)/10)*10;
        y = Math.ceil(Math.random(0,p.height)/10)*10;
        console.log(x);
        snake = new Snake(x,y);
        food = new Food();
    };
  
    p.draw = function() {
        p.background(0);
        snake.placeSnake(p);
        snake.think(p);
        if(counter % 5 == 0){
            snake.moveSnake();
        }
        food.placeFood(p);
        if(food.hitsFood(snake)){
             food.generateFood(p);
        }
        //TODO:
        //If snake hits wall: destroy

        counter++;
    };
  };
  console.log("%d",k);
  var myp5 = new p5(t);
  savedScreens.push(myp5);

}
function setBG(cnv){
    cnv.draw = function() {
        cnv.background(200);
    }
}