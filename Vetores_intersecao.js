let AB, CD, crossing;
let a1, a2, b1, b2, c1, c2, d1, d2;
// definir o número de retas
let numLines = 5;
let vecLines = [];
let numCollisions = 0;
let collisionChecked = false

// cria o número de retas definidas por numLines com valores aleatórios para os pontos
function createLines(){
  for (let i=0; i<numLines; i++){
    let createa1 = random(-200,200);
    let createa2 = random(-200,200);
    let createb1 = random(-200,200);
    let createb2 = random(-200,200);
    let createAB = new vetor(createa1, createa2, createb1, createb2);
    vecLines.push(createAB);
  }
}

// desenha as retas
function drawVecLines(){
  for(let k = 0; k < numLines; k++){
  colore(random(0,255),random(0,255),random(0,255));
  vecLines[k].draw();
  }
}

// checando colisões através de análise combinatória das retas 
function getCollisionLines(){
    for(let i = 0; i < numLines; i++){
    for (let j = i+1; j < numLines; j++){
      getCrossing(vecLines[i],vecLines[j]); 
      if (getCrossing(vecLines[i],vecLines[j]) == true){
        numCollisions +=1;
      }
    }
  }
  collisionChecked = true;
}

// indicativo de colisão
function collisionText(){
  if (numCollisions > 0){
    colore(200,0,100);
    texto(numCollisions + " Colisão(ões) detectada(s)",-190,180)
  } else {
    colore(123,123,123);
    texto("Sem colisões detectadas",-190,180)
  }
}

// gerando novos pontos
function randomizePoints(){
  for (let i = 0; i<numLines; i++){
    vecLines[i].p1.x = random(-200,200);
    vecLines[i].p1.y = random(-200,200);
    vecLines[i].p2.x = random(-200,200);
    vecLines[i].p2.y = random(-200,200);
  }
}

// gerar novos pontos com keyPressed (precisa mudar o frameRate, que está em zero)
function keyPressed(){
  collisionChecked = false;
  numCollisions = 0;
  randomizePoints();
}

function setup() {
  createCanvas(400, 400);
  createLines();
}

function draw() {
  goCartesian();
  // frameRate definido para zero, se redefinido para valores maiores continua mostrando as retas e o número de colisões e pode ser atualizado com keyPressed
  frameRate(0);
  drawVecLines();
  
  if(!collisionChecked){
    getCollisionLines();
  }

  collisionText();
}


class vetor {
  constructor(a1, a2, b1, b2) {
	this.p1 = createVector(a1, a2);
	this.p2 = createVector(b1, b2);
  }

  draw() {
	arrow(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }

  isDegenerate() {
	return this.p1.equals(this.p2);
  }
}

function getCrossing(AB, CD) {
  if (AB.isDegenerate() || CD.isDegenerate()){
     return null;
  }

  let ABx1 = AB.p1.x;
  let ABx2 = AB.p2.x;
  let ABy1 = AB.p1.y;
  let ABy2 = AB.p2.y;
  let CDx1 = CD.p1.x;
  let CDx2 = CD.p2.x;
  let CDy1 = CD.p1.y;
  let CDy2 = CD.p2.y;

  let denominador = (CDy2 - CDy1) * (ABx2 - ABx1) - (CDx2 - CDx1) * (ABy2 - ABy1);

  if (denominador == 0){
    return null;
  }
  
  let pA = ((CDx2 - CDx1) * (ABy1 - CDy1) - (CDy2 - CDy1) * (ABx1 - CDx1)) / denominador;
  let pB = ((ABx2 - ABx1) * (ABy1 - CDy1) - (ABy2 - ABy1) * (ABx1 - CDx1)) / denominador;

  //descartando interseções quando t<0 ou t>1
  if (pA >= 0 && pA <= 1 && pB >= 0 && pB <= 1) {
	let crossX = ABx1 + pA * (ABx2 - ABx1);
	let crossY = ABy1 + pA * (ABy2 - ABy1);
    colore(255,0,255)
	circle(crossX, crossY,3);
    return true;
  } else return null;
}


function goCartesian() {
  background(255);

  mouseXC = mouseX - width / 2;
  mouseYC = height / 2 - mouseY;

  colore(0, 0, 0);
  arrow(0, height / 2, width, height / 2);
  colore(0, 0, 0);
  arrow(width / 2, height, width / 2, 0);

  translate(width / 2, height / 2);
  scale(1, -1, 1);
}

// atualiza as variáveis globais com as coordenadas do mouse no plano cartesiano
function grabMouse() {
  mouseXC = mouseX - width / 2;
  mouseYC = height / 2 - mouseY;
}

// renderiza texto corretamente no plano cartesiano
function texto(str, x, y) {
  push();
  resetMatrix();
  translate(width / 2, height / 2);
  // desenha o texto normalmente
  text(str, x, -y);
  pop();
}

function colore(c1, c2, c3, c4) {
  if (c4 != null) {
	fill(c1, c2, c3, c4);
	stroke(c1, c2, c3, c4);
	return;
  }
  if (c3 != null) {
	fill(c1, c2, c3);
	stroke(c1, c2, c3);
	return;
  }

  if (c2 == null) {
	fill(c1);
	stroke(c1);
  } else {
	fill(c1, c1, c1, c2);
	stroke(c1, c1, c1, c2);
  }
}

/* Desenha um segmento de reta com seta do ponto (x1,y1) para (x2,y2)
 */
function arrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  var dx = x2 - x1,
	dy = y2 - y1;
  var le = sqrt(dx * dx + dy * dy);
  var vx = dx / le,
	vy = dy / le;
  var ux = -vy;
  var uy = vx;
  triangle(
	x2,
	y2,
	x2 - 5 * vx + 2 * ux,
	y2 - 5 * vy + 2 * uy,
	x2 - 5 * vx - 2 * ux,
	y2 - 5 * vy - 2 * uy
  );
}



