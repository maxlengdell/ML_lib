function nextGen() {
    calculateFitness();
    for(let i = 0; i< total_pop; i++){
        birds[i] = pickOne();
    }
    console.log("next generation");
    saved_birds = [];
}

function pickOne(list, prob){
     var index = 0;
     var r = random(1);

     while (r > 0){
         r = r-saved_birds[index].fitness;
         index++;
     }
    index--;
    let bird = saved_birds[index];
    let child = new Bird(bird.brain);
    child.mutate();

    return child;}

function calculateFitness() {
    let sum = 0;
    for(let bird of saved_birds) {
        sum += bird.score;
    }
    for(let bird of saved_birds) {
    bird.fitness = bird.score / sum;
   }
}