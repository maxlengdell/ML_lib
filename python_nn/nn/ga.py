import random

import bird


def nextGen(savedBirds):
    #calculate fitness of savedBirds
    birds = [None] * len(savedBirds)
    savedBirds = calculateFitness(savedBirds)
    for i in range(len(savedBirds)):
        birds[i] = pickOne(savedBirds)
    return birds


def pickOne(savedBirds):
    index = 0
    r = random.random()

    while( r > 0 ):
        r = r-savedBirds[index].fitness
        index += 1
    index -= 1
    bird_select = savedBirds[index]
    child = bird.Bird(bird_select.brain,400,500)

    child.mutate()
    return child

def calculateFitness(savedBirds):
    #return array with saved birds
    sum = 0
    for bird in savedBirds:
        sum += bird.score
    for bird in savedBirds:
        bird.fitness = bird.score / sum

    return savedBirds