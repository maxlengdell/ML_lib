from main import *
import pygame


class Bird:
    def __init__(self):
        self.y = 200
        self.x = 100
        self.gravity = 0.5
        self.velocity = 0
        self.lift = -15
        self.size = 25
    def placeBird(self,canvas):
        pygame.draw.circle(canvas,green,[self.x,self.y],self.size)


    def update(self):
        self.velocity *= 0.9
        self.velocity += self.gravity
        self.y += self.velocity