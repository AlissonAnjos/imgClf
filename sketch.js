let classifier = ml5.imageClassifier('MobileNet', modelReady);
let img;

function setup() {
  // create canvas
  var c = createCanvas(400, 400);
  background(100);
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Arraste uma imagem para classificar', width / 2, height / 2);
}

function modelReady() {
  console.log('model ready');
}

function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    img = createImg(file.data, imageReady).hide();
  } else {
    println('Not an image file!');
  }
}

function imageReady() {
  // Draw the image onto the canvas
  classifier.predict(img, gotResult);
  background(0);
  image(img, 0, 0, width, height);
}


function gotResult(err, results) { //callback pelo tempo de classificar a img
  if (err) { // esse tipo de callback tem meio q um try catch necessario
    console.error(err);
  } else {
    console.log(results); //printa o predict
    let label = results[0].className; //escolhe o primeiro chute
    let prob = (int)(results[0].probability * 100); //o nome das labels da pra ver no resultado do log
    fill(255, 0, 0); //escreve o nome do primeiro chute 
    noStroke();
    textSize(25);
    textAlign(CENTER);
    text('Name: ' + label, width/2, height - 50);
    text('Probability = ' + prob + '%', width/2, height - 20);
  }
}
