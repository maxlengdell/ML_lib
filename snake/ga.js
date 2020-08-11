function nextGen() {
    // calculateFitness();
    // for(let i = 0; i < screens; i++){
    //     savedSnakes[i] = pickOne();
    // }
    console.log("next generation");
    //Remove bad snakes from savedSnakes
    calculateFitness();
    //let s = savedSnakes[Math.floor(Math.random() * savedSnakes.length)];
    let s = pickOne();
    let child = new Snake(s.brain);
    if(savedSnakes.length == screens){
        savedSnakes = [];
    }
    //console.log("next gen");
    return child;
}

function pickOne(list, prob){
     var index = 0;
     var r = Math.random();

     while (r > 0){
         r = r-savedSnakes[index].fitness;
         index++;
     }
    index--;
    let snake_save = savedSnakes[index];
    console.log(snake_save.score);
    let child = new Snake(snake_save.brain);
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    for(let snake of savedSnakes) {
        sum += snake.score;

    }
    for(let snake of savedSnakes) {
    snake.fitness = snake.score / sum;
   }
}