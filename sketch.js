let flowers = []; // Array flowers
let maxFlowers = 50; // Maximum
let json;

function preload() {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=imperial&APPID=e812164ca05ed9e0344b89ebe273c141";
  json = loadJSON(url);

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); 
   temperature = json.main.temp;
  print(temperature);
  // initial flower
  plantFlower(width / 2, height / 2);
}

function draw() {
  background(220);
  
  // Draw flower
  flowers.forEach((flower, index) => {
    push(); // new draw
    translate(flower.x, flower.y); // Move to the flower's location
    
    // Animate 
    let sway = sin(frameCount + flower.swayOffset) * flower.swayRange;
    
    // Stem
    stroke(85, 107, 47); // color
    line(0, 0, sway, -flower.stemHeight); // movement of the stem
    
    // Draw flower head
    for (let i = 0; i < flower.petals; i++) {
      push(); // Isolate rotation for each petal
      rotate(i * (360 / flower.petals) + sway); // movement of the petals
      stroke(flower.color);
      noFill();
      arc(sway, -flower.stemHeight, flower.petalSize, flower.petalSize, 0, 180); //Petal position
      pop();
    }
    
    pop(); // Restore drawing state
    
    // growth
    flower.stemHeight += flower.growthRate;
    flower.petalSize += flower.growthRate * 0.5;
    flower.growthRate *= 0.99; // Slow growth over time
  });
  
  // Plant a new flower 
  if (flowers.length < maxFlowers && frameCount % 60 == 0) { 
    let angle = random(360);
    let distance = random(50, 150);
    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    plantFlower(x, y);
  }
}

// plant a new flower
function plantFlower(x, y) {
  flowers.push({
    x: x,
    y: y,
    stemHeight: random(20, temperature),
    petalSize: random(10, temperature),
    petals: floor(random(4, temperature)), // Number of petals
    color: color(random(255), random(255), random(255)), //  color
    growthRate: random(0.1, 0.5), // How fast the flower grows
    swayRange: random(5, temperature), // Range of sway movement
    swayOffset: random(temperature) // Sway phase offset for variety
  });
}
