class Matrix{

  constructor(rows,cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (var i = 0; i< this.rows; i++){
      this.data[i] = [];
      for (var j = 0; j < this.cols; j++){
        this.data[i][j] = 0;
      }
    }

  }
  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }
  static fromArray(arr){
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i<arr.length ;i++){
      m.data[i][0] = arr[i];
    }
    return m;
  }
  static subtract(a,b){
    //Matrix addition
    /*
    if(a.cols !== b.cols){
    console.log("Matrix does not match");
    return undefined;
  }else{*/
  let result = new Matrix(a.rows, a.cols);
  for (var i = 0; i< result.rows; i++){
    for (var j = 0; j < result.cols; j++){
      result.data[i][j] = a.data[i][j] - b.data[i][j];

    }
  }
  return result;
}

static map(matrix, func){
  //Apply function to every element
  let result = new Matrix(matrix.rows, matrix.cols);

  for (var i = 0; i< matrix.rows; i++){
    for (var j = 0; j < matrix.cols; j++){
      let val = matrix.data[i][j];
      result.data[i][j] = func(val);
    }
  }
  return result;
}
toArray() {
  let arr = [];
  for (var i = 0; i< this.rows; i++){
    for (var j = 0; j < this.cols; j++){
      arr.push(this.data[i][j]);

    }
  }
  return arr;

}
add(n){
  //Matrix addition
  if(n instanceof Matrix){
    for (var i = 0; i< this.rows; i++){
      for (var j = 0; j < this.cols; j++){
        this.data[i][j] += n.data[i][j];
      }
    }
  }else { //element addition

    for (var i = 0; i< this.rows; i++){
      for (var j = 0; j < this.cols; j++){
        this.data[i][j] += n;
      }
    }
  }
}
static transpose(matrix) {
  let result = new Matrix(matrix.cols, matrix.rows);
  for (var i = 0; i< matrix.rows; i++){
    for (var j = 0; j < matrix.cols; j++){
      result.data[j][i] = matrix.data[i][j];
    }
  }
  return result;
}

static multiply(a,b){
  //Matrix product
  if(a.cols !== b.rows){
    console.log("Matrix does not match");
    return undefined;
  }
  let result = new Matrix(a.rows,b.cols);

  for(let i = 0; i < result.rows; i++){
    for(let j = 0; j< result.cols; j++){
      let sum = 0;
      for(let k = 0; k<a.cols;k++){
        sum += a.data[i][k] * b.data[k][j];
      }
      result.data[i][j] = sum;
    }
  }
  return result;
}
multiply(n){
  if (n instanceof Matrix) {
    // hadamard product
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= n.data[i][j];
      }
    }
  } else {

    //Scalar multiplication
    for (var i = 0; i< this.rows; i++){
      for (var j = 0; j < this.cols; j++){
        this.data[i][j] *= n;
      }
    }
  }
}
map(func){
  //Apply function to every element
  for (var i = 0; i< this.rows; i++){
    for (var j = 0; j < this.cols; j++){
      let val = this.data[i][j];
      this.data[i][j] = func(val);
    }
  }
}

print() {
  console.table(this.data);
}
randomize(){
  for (var i = 0; i< this.rows; i++){
    for (var j = 0; j < this.cols; j++){
      this.data[i][j]= Math.random()*2 - 1;
    }
  }
}
}
