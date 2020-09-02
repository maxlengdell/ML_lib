from main import *
import nn
import pygame

from nn.nn import NeuralNetwork


class Bird:
    def __init__(self,brain,canvas_width,canvas_height):
        self.y = 200
        self.x = 100
        self.gravity = 0.5
        self.velocity = 0
        self.lift = -15
        self.size = 15

        self.canvas_width = canvas_width
        self.canvas_height = canvas_height

        self.score = 0
        self.fitness = 0

        if isinstance(brain,NeuralNetwork):
            self.brain = brain.copy_nn()
        else:
            self.brain = NeuralNetwork(5,8,2)
    def placeBird(self,canvas):
        pygame.draw.circle(canvas,green,[self.x,self.y],self.size)

    def think(self,pipes):
        closest = None
        closestD = 99999
        for i in range(len(pipes)):
            d = pipes[i].x + pipes[i].width-self.x
            if(d < closestD):

                closest = pipes[i]
                closestD = d
        inputs = [None] * 5
        inputs[0] = self.y/self.canvas_height
        inputs[1] = closest.y_top/self.canvas_height
        inputs[2] = closest.y_bot/self.canvas_height
        inputs[3] = closest.x/self.canvas_width
        inputs[4] = self.velocity/10

        output = self.brain.predict(inputs)
        if(output[0] > 0.5):
            self.up()




    def update(self):
        self.score += 1
        self.velocity *= 0.9
        self.velocity += self.gravity
        self.y += self.velocity

    def up(self):
        self.velocity += self.lift

    def offScreen(self,height):
        if self.y > height:
            return True
        elif(self.y < 0):
            return True
        else:
            return False
