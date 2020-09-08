import pygame
import random
import main


class Pipe:
    def __init__(self,canvas_width,canvas_height):
        self.spacing = 100
        self.y_top = random.uniform(canvas_height / 6, 3/4 * canvas_height)
        self.y_bot = self.y_top + self.spacing
        self.x = canvas_width
        self.height = canvas_height
        self.width = 60
        self.velocity = 3
        self.top_pipe = None
        self.bottom_pipe = None

    def placePipe(self,canvas):
        self.top_pipe = pygame.draw.rect(canvas,main.white,(self.x,0,self.width,
                                                           self.y_top))
        self.bottom_pipe = pygame.draw.rect(canvas,main.white,(self.x,self.y_bot,
                                                              self.width,
                                            self.y_bot+self.height))
    def update(self):
        self.x -= self.velocity

    def hit(self,bird):
        if(self.x < bird.x + bird.size):
            return self.top_pipe.collidepoint((bird.x,bird.y)) | self.bottom_pipe.collidepoint((
                bird.x,bird.y))
        else:
            return False
