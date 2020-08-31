import pygame, sys
from bird import *
from pygame.locals import *

############################

black = pygame.Color(0, 0, 0)
white = pygame.Color(255, 255, 255)
red = pygame.Color(255, 0, 0)
green = pygame.Color(0, 255, 0)
blue = pygame.Color(0, 0, 255)


class App:
    def __init__(self):
        self.events = None
        self._running = True
        self.clock = None
        self.canvas = None
        self.width = 400
        self.height = 500
        self.size = self.width, self.height
        self.birds = None

    def on_init(self):
        pygame.init()
        self.clock = pygame.time.Clock()
        self.canvas = pygame.display.set_mode(self.size)
        pygame.display.set_caption("flappy!")
                                        #pygame.HWSURFACE |
                                        # pygame.DOUBLEBUF)

        self._running = True
        self.birds = Bird()

    def on_event(self, event):
        if event.type == pygame.QUIT:
            self._running = False

    def on_loop(self):
        self.canvas.fill(black)
        self.birds.placeBird(self.canvas)
        self.birds.update()

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
            self.keyBoard()
            self.on_loop()
            self.on_render()
        self.on_cleanup()

    def keyBoard(self):
        self.events = pygame.event.get()
        if self.event.key == pygame.K_SPACE:
            print("space")





if __name__ == "__main__":
    theApp = App()
    theApp.on_execute()