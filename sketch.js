let xOff1_BuzzingBee = 0;
let xOff2_BuzzingBee = 10000;

function drawBuzzingBee() {
  background(51);
  var x = width * noise(xOff1_BuzzingBee);
  var y = height * noise(xOff2_BuzzingBee);
  ellipse(x, y, 24, 24);

  xOff1_BuzzingBee += 0.02;
  xOff2_BuzzingBee += 0.02;
}

var increment_graph = 0.01;
var xInitialOffset_graph = 0;
function drawGraphPerlin() {
  background(51);
  stroke(255);
  noFill();
  beginShape();
  xOff = xInitialOffset_graph;
  for (let x = 0; x < width; x++) {
    stroke(255);
    var y = height * noise(xOff);
    vertex(x, y);

    xOff += increment_graph;
  }
  endShape();
  xInitialOffset_graph += increment_graph;
}

function drawGraphSinPerlin() {
  background(51);
  stroke(255);
  noFill();
  beginShape();
  xOff = xInitialOffset_graph;
  for (let x = 0; x < width; x++) {
    stroke(255);
    var noiseValue = map(noise(xOff), 0, 1, -12, 12);
    var sinValue = map(sin(xOff), -1, 1, 0, height);
    var y = sinValue + noiseValue;
    vertex(x, y);

    xOff += increment_graph;
  }
  endShape();
  xInitialOffset_graph += increment_graph;
}

let increment_2D = 0.15;
let zOff = 0;
function draw2D() {
  pixelDensity(1);
  let yOff = 0;
  loadPixels();
  for (let x = 0; x < width; x++) {
    let xOff = 0;
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      var brightness = noise(xOff, yOff, zOff) * 255;

      pixels[index] = brightness; //red value
      pixels[index + 1] = brightness; //green value
      pixels[index + 2] = brightness; //blue value
      pixels[index + 3] = 255; //alpha value

      xOff += increment_2D;
    }
    yOff += increment_2D;
  }
  // increment_2D
  updatePixels();
  zOff += 0.01;
}

let scale = 10;
let cols, rows;
let increment_flow = 0.1;
let zOff_flow = 0;
let particles = [];
function drawFlowField() {
  background(255);
  randomSeed(10);
  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * width) * 4;
      var angle = noise(xOff, yOff, zOff_flow) * TWO_PI;
      var vector = p5.Vector.fromAngle(angle);
      xOff += increment_flow;
      stroke(0);
      push();
      translate(x * scale, y * scale);
      rotate(vector.heading());
      line(0, 0, scale, 0);
      pop();
    }
    yOff += increment_flow;
  }
  zOff_flow += 0.005;
}

let framerate;
function setup() {
  createCanvas(200, 200);
  

  // flow field setup
  cols = floor(width / scale);
  rows = floor(height / scale);
  framerate = createP('');
  for (var p = 0; p < 100; p++) {
    particles[p] = new Particle();
  }
}

function draw() {
  framerate.html(floor(frameRate()));
  // drawBuzzingBee();
  // drawGraphPerlin();
  // drawGraphSinPerlin();
  draw2D();
  // drawFlowField();
}
