import random

from bird import Bird


def nextGen(savedBirds):
    #calculate fitness of savedBirds
    savedBirds = calculateFitness(savedBirds)


def pickOne(savedBirds):
    index = 0
    r = random.random()

    while( r > 0 ):
        r = r-savedBirds[index].fitness
        index += 1
    index -= 1
    bird = savedBirds[index]
    child = Bird(bird.brain)
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