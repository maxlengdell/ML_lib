var screens = 30;
var savedScreens = [];
var savedSnakes = [];
var livingSnakes = [];
var genCounter = 0;
var cnt = 0;
let slider;
let value = 10;
let dirSet = 0;

for(let k = 0; k < screens ;k++){

  var t = function( p ) { 
    var snake;
    var counter = 0;
    var food;
    p.setup = function() {
        p.createCanvas(200, 200);
        x = Math.ceil(Math.random(0,p.width)/10)*10;
        y = Math.ceil(Math.random(0,p.height)/10)*10;
        food = new Food();
        snake = new Snake();
        livingSnakes.push(snake);
        if(k == 0){
            var slider = document.getElementById("myRange");
            output = slider.value;
        
            slider.oninput = function(){
                output = this.value;
                value = output;
            }
        }

    };
    var collided = 0;
    p.draw = function() {
        p.background(0);
        //If snake is still alive
        if(snake instanceof Snake){
            snake.placeSnake(p);
            snake.think(p,food);

            food.hitsFood(snake);

            if(counter % value == 0){
                snake.update();
                dirSet = 0;
                oldX = snake.size[0].x;
                oldY = snake.size[0].y;
                snake.moveSnake();
                collided = snake.collision();
                if(snake.awayFromFood(food,oldX,oldY,snake)){
                    snake.score -= 1.5;
                    
                }
                
            }
            food.placeFood(p);
            if(food.hitsFood(snake)){
                food.generateFood(p);
                snake.score += 10;
            }

            if(snake.offScreen(p) || collided || snake.score < 0){
                //Dead;
                if(snake.offScreen(p)){
                    p.background('red');

                }else if(snake.collision()){
                    p.background('blue');
                }else if(snake.score < -10){
                    p.background('green');
                }
                snake.dead = 1;
                ind = livingSnakes.findIndex(alive);
                livingSnakes.splice(ind,1);
   
                savedSnakes.push(snake);
                snake = null;

                genCounter++;
                food.x = 80;
                food.y = 50;
                counter = 0;
                console.log(genCounter);

                
            }   
        }
        
        if(genCounter >= screens){
            if(cnt < screens){
                snake = nextGen(cnt);                
                livingSnakes.push(snake);
            }else{
                genCounter = 0;
            }
            cnt++

        }else{
            cnt = 0;
        } 

        
        counter++;

    };
  };
  var myp5 = new p5(t);
  savedScreens.push(myp5);

  function alive(snake){
      return snake.dead == 1;
  }
}
// var snake;
// var population = 1;
// var counter = 0;
// var food;
//  function setup(){
//     createCanvas(400, 400);
//     x = Math.ceil(Math.random(0,width)/10)*10;
//     y = Math.ceil(Math.random(0,height)/10)*10;
//     food = new Food();
//     snake = new Snake();
//     livingSnakes.push(snake);

//         var slider = document.getElementById("myRange");
//         output = slider.value;
    
//         slider.oninput = function(){
//             output = this.value;
//             value = output;
//         }
    
// }
// let counter = 0;


//  function draw(){
    
//         background(0);
//         //If snake is still alive
//         if(snake instanceof Snake){
//             snake.placeSnake();
//             //snake.think(food);
//             snake.update();
//             food.hitsFood(snake);

//             if(counter % value == 0){
//                 dirSet = 0;
//                 oldX = snake.size[0].x;
//                 oldY = snake.size[0].y;

//                 snake.moveSnake();
                


//                 if(snake.awayFromFood(food,oldX,oldY,snake)){
//                     snake.score -= 1.5;
                    
//                 }
//             }
//             food.placeFood();
//             if(food.hitsFood(snake)){
//                 food.generateFood();
//                 snake.score += 10;
//             }

//             if(snake.offScreen() || /*snake.collision() ||*/ snake.score < -10){
//                 //Dead;
                
//                 snake.dead = 1;
//                 ind = livingSnakes.findIndex(alive);
//                 livingSnakes.splice(ind,1);
   
//                 savedSnakes.push(snake);
//                 snake = null;

//                 genCounter++;
//                 food.x = 80;
//                 food.y = 50;
//                 counter = 0;

                
//             }   
//         }

//         if(genCounter == screens){
//             if(cnt < screens){
//                 snake = nextGen(cnt);                
//                 livingSnakes.push(snake);
//             }else{
//                 genCounter = 0;
//             }
//             cnt++

//         }else{
//             cnt = 0;
//         } 

        
//         counter++;

//     //}
// }
// function keyPressed(){
//     if(dirSet == 0){
//         if(keyCode === UP_ARROW && snake.dy != 10){
//             dirSet = 1;
//             snake.dy = -10;
//             snake.dx = 0;
//         }else if(keyCode === RIGHT_ARROW && snake.dx != -10){
//             dirSet = 1;
//             snake.dy = 0;
//             snake.dx = 10;
//         }else if(keyCode === LEFT_ARROW && snake.dx != 10){
//             dirSet = 1;
//             snake.dy = 0;
//             snake.dx = -10;
//         }else if(keyCode === DOWN_ARROW && snake.dy != -10){
//             dirSet = 1;
    
//             snake.dy = 10;
//             snake.dx = 0;
//         }
//     }
//   }