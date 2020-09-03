import pygame, sys
from bird import *
from nn.ga import nextGen
from pipes import *
from pygame.locals import *

############################

black = pygame.Color(0, 0, 0)
white = pygame.Color(255, 255, 255)
red = pygame.Color(255, 0, 0)
green = pygame.Color(0, 255, 0)
blue = pygame.Color(0, 0, 255)
global theApp
counter = 0

class App:
    def __init__(self):
        self.events = None
        self._running = True
        self.clock = None
        self.canvas = None
        global width
        global height
        self.width = 400
        self.height = 500
        self.size = self.width, self.height
        self.birds = []
        self.savedBirds = []
        self.pipes = []
        self.totalBirds = 30

    def on_init(self):
        pygame.init()
        self.clock = pygame.time.Clock()
        self.canvas = pygame.display.set_mode(self.size)
        pygame.display.set_caption("flappy!")
                                        #pygame.HWSURFACE |
                                        # pygame.DOUBLEBUF)

        self._running = True
        self.pipes.insert(0, Pipe(self.width, self.height))

        for x in range(0,self.totalBirds):
            self.birds.append(Bird(None,self.width,self.height))


    def on_event(self, event):
        if event.type == pygame.QUIT:
            self._running = False

    def on_loop(self):
        global counter
        self.canvas.fill(black)

        for pipe in self.pipes:
            if(pipe.x < -pipe.width):
                self.pipes.pop()
            else:
                pipe.placePipe(self.canvas)
                pipe.update()

        ##game loop for updating birds and pipes
        for bird in self.birds:
            for pipe in self.pipes:
                if(pipe.hit(bird)):
                    self.savedBirds.append(bird)
                    self.birds.remove(bird)

            if bird.offScreen(self.height):
                self.birds.remove(bird)

            bird.placeBird(self.canvas)
            bird.think(self.pipes)
            bird.update()
        if(len(self.savedBirds) == self.totalBirds):
            counter = 0
            nextGen(self.savedBirds)
            #reset pipes

        counter += 1

        ##Append new pipe to the right side of the screen
        if(counter % 75 == 0):
            self.pipes.insert(0,Pipe(self.width,self.height))
        ##

    def on_render(self):
        pygame.display.update()
        self.clock.tick(60)

    def on_cleanup(self):
        pygame.quit()

    def on_execute(self):
        if self.on_init() == False:
            self._running = False
        while (self._running):
            for event in pygame.event.get():
                self.on_event(event)
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        print("space")
                        self.birds[0].up()






            self.on_loop()
            self.on_render()
        self.on_cleanup()
    def getCanvasWidth(self):
        return self.width

    def getCanvasHeight(self):
        return self.height

if __name__ == "__main__":
    theApp = App()
    theApp.on_execute()