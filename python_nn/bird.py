from main import *
import pygame


class Bird:
    def __init__(self):
        self.y = 200
        self.x = 100
        self.gravity = 0.5
        self.velocity = 0
        self.lift = -15
        self.size = 15
    def placeBird(self,canvas):
        pygame.draw.circle(canvas,green,[self.x,self.y],self.size)



    def think(self,pipes):
        closest = None
        closestD = 99999
        for pipe in pipes:
            d = pipe.x + pipe.width-self.x
            if(d < closestD):
                closest = pipe
                closestD = d
        inputs = []


    def update(self):
        if(self.y >= 500):
            self.y = 500

            self.velocity *= 0.9
            self.velocity += self.gravity
            self.y += self.velocity
        else:
            self.velocity *= 0.9
            self.velocity += self.gravity
            self.y += self.velocity

    def up(self):
        self.velocity += self.lift