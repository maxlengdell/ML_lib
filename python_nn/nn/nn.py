import numpy as np
import random
class NeuralNetwork:
    def __init__(self,a,b,c):
        if isinstance(a,NeuralNetwork):
            self.input_nodes = a.input_nodes
            self.hidden_nodes = a.hidden_nodes
            self.output_nodes = a.output_nodes

            self.weights_ih = a.weights_ih.copy()
            self.weights_ho = a.weights_ho.copy()

            self.bias_h = a.bias_h.copy()
            self.bias_o = a.bias_o.copy()
        else:
            self.input_nodes = a
            self.hidden_nodes = b
            self.output_nodes = c

            #Random
            #self.weights_ih = np.array(self.hidden_nodes,self.input_nodes)
            #self.weights_ho = np.array(self.output_nodes,self.hidden_nodes)
            self.weights_ih = np.random.rand(self.hidden_nodes,self.input_nodes)*2-1
            self.weights_ho = np.random.rand(self.output_nodes,self.hidden_nodes)*2-1

            self.bias_h = np.random.rand(self.hidden_nodes,1)*2-1
            self.bias_o = np.random.rand(self.output_nodes,1) * 2 - 1

    def predict(self,input_array):
        sigFunc = np.vectorize(sigmoid)

        inputs = np.array(input_array)
        inputs.shape = (5,1) # Set correct shape of input array
        hidden = self.weights_ih.dot(inputs)

        hidden = np.add(hidden,self.bias_h)

        hidden = sigFunc(hidden)


        output = self.weights_ho.dot(hidden)
        output = output + self.bias_o
        output = sigFunc(output)
        return output.flatten()

    # def train(self,input_array,target_array):
    #     sigFunc = np.vectorize(sigmoid)
    #     dsigFunc = np.vectorize(dsigmoid)
    #
    #
    #     inputs = input_array
    #     hidden = self.weights_ih.dot(inputs)
    #
    #     hidden = sigFunc(hidden)
    #
    #     outputs = self.weights_ho.dot(hidden)
    #     outputs = outputs + self.bias_o
    #     outputs = sigFunc(outputs)
    #
    #     targets = target_array
    #     output_errors = targets - outputs
    #
    #     ## could be faulty above here
    #
    #     #Gradient decent
    #     gradients = dsigFunc(outputs)
    #     gradients = gradients.dot(output_errors)
    #     gradients = gradients.dot(self.learning_rate)
    #



    def copy_nn(self):
        new_class = NeuralNetwork(self)
        return new_class

    def mutate(self):
        mutateFunc = np.vectorize(mutateHelper)




def sigmoid(x):
    return 1/(1+np.exp(-x))
def dsigmoid(y):
    return y*(1-y)
def mutateHelper(x):
    #mutation rate
    rate = 0.1
    if(random.random() < rate):
        offset = random.random() * 0.5
        newX = x + offset
        return newX
    else:
        return x