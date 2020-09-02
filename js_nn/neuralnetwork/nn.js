function sigmoid(x){
  return 1/(1+ Math.exp(-x));
}
function dsigmoid(y){
  //return (sigmoid(x)*(1-sigmoid(x)));
  return y*(1-y);
}


class NeuralNetwork{
  constructor(a, b, c) {
    if (a instanceof NeuralNetwork) {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();
    } else {
      this.input_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.weights_ih.randomize();
      this.weights_ho.randomize();
      console.log(this.weights_ih);
      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize();
      this.bias_o.randomize();
      throw error;

    }

  }

  predict(input_array){
    //Generating hidden outputs
    let inputs = Matrix.fromArray(input_array);
    console.log("weights:", this.weights_ih)
    console.log("inputs: ", inputs)

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    console.log("______")

    hidden.add(this.bias_h);
    hidden.map(sigmoid);
    //activation
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);


    return output.toArray();
  }
  train(input_array, target_array){
    //Generate hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    //Activation
    hidden.map(sigmoid);
    //activation
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);


    // let outputs = this.feedforward(inputs);
    //Converting to Matrix object
    let targets = Matrix.fromArray(target_array);

    //Calculate error
    //Error = Targets - outputs
    let output_errors = Matrix.subtract(targets, outputs);

    //Gradient decent:
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);


    //Calculatbe deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(outputs, hidden_T);

    //Adjust weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    //Adjust the bias by its deltas
    this.bias_o.add(gradients);


    //Calculate the hidden layer errors
    let weights_ho_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);
    //Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden,dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);
    //Calculate input -> hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient,inputs_T);

    //Adjust weights by deltas
    this.weights_ih.add(weight_ih_deltas);
    //Adjust the bias by its deltas
    this.bias_h.add(hidden_gradient);
  }
  copy() {
    return new NeuralNetwork(this);
  }
  mutate(rate) {
    // This is how we adjust weights ever so slightly
    function mutate(x) {
      if (Math.random() < rate) {
        //Randomgaussian
        var offset = Math.random() * 0.5;
        // var offset = random(-0.1, 0.1);
        var newx = x + offset;
        return newx;
      } else {
        return x;
      }
    }
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
  serialize() {
    return JSON.stringify(this);
  }
}
