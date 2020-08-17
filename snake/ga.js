function nextGen(i,p) {
    // calculateFitness();

    //Remove bad snakes from savedSnakes
    calculateFitness();
    livingSnakes[i] = pickOne(p);

    s = livingSnakes[i];
    if(i == screens -1){
        savedSnakes = [];

    }
    return s;
}
function pickHighest(p){
    let highestFitness = 0;
    let bestSnakeBrain;
    for(let snake of savedSnakes) {
        if(snake.fitness > highestFitness){
            highestFitness = snake.fitness;
            bestSnakeBrain = snake.brain;
        }
    }
    console.log("highest fitness: " + highestFitness);
    let child = new Snake(bestSnakeBrain,p);
    
    child.mutate();
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