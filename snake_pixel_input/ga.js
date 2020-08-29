function nextGen(i,p) {
    // calculateFitness();
    // for(let i = 0; i < screens; i++){
    //     savedSnakes[i] = pickOne();
    // }
    //Remove bad snakes from savedSnakes
    calculateFitness();
    
    livingSnakes[i] = pickOne(p);
    
    s = livingSnakes[i];
    if(i == screens -1){
        console.log("next generation");

        savedSnakes = [];

    }

    return s;
}

function pickOne(){
    var index = 0;
    var r = Math.random();
    while (r > 0){
         r = r-savedSnakes[index].fitness;
         index++;
     }
    index--;
    let snake_save = savedSnakes[index];
    //console.log(snake_save.score);
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