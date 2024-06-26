let v1, v2, v3;
let vResult;
let s;

//produto escalar
function vdot(a,b){ 
  return a[0]*b[0] + a[1]*b[1];
}

function rot90(v){
  return [-v[1],v[0]];
}

function vmul(s,v){
  return [s*v[0], s*v[1]];
}

function vadd(a,b){
  return [a[0]+b[0], a[1]+b[1]];
}

function vadds(a,b,s){
  return [a[0]+b[0]*s, a[1]+b[1]*s];
}

function vsub(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

function vprod(a, b) {
    // componentes x e y do produto vetorial em 2D são sempre zero, já que o resultado é perpendicular ao plano formado pelos dois vetores
      let x = 0; 
      let y = 0;
      let z = a[0] * b[1] - a[1] * b[0];   
      return [x, y, z];
}

class vector{
  constructor(a, b){
    this.p = [a, b];
  }
  
  draw(){
    arrow(0,0,this.p[0],this.p[1])
  }
}

// 6 funções diferentes drawSum que desenham os vetores a serem somados em ordem diferentes
function drawSum(){
  colore(255,0,0);
  v1.draw();
  let vSum = new vector(vadd(v1.p,v2.p)[0], vadd(v1.p,v2.p)[1]);
  let vSum2 = new vector(vadd(vSum.p,v3.p)[0], vadd(vSum.p,v3.p)[1]);
  colore(0,255,0);
  arrow(v1.p[0],v1.p[1],vSum.p[0],vSum.p[1]);
  colore(0,0,255);
  arrow(vSum.p[0],vSum.p[1],vSum2.p[0],vSum2.p[1]);
}

function drawSum2(){
  colore(255,0,0);
  v2.draw();
  let vSum = new vector(vadd(v2.p,v3.p)[0], vadd(v2.p,v3.p)[1]);
  let vSum2 = new vector(vadd(vSum.p,v1.p)[0], vadd(vSum.p,v1.p)[1]);
  colore(0,255,0);
  arrow(v2.p[0],v2.p[1],vSum.p[0],vSum.p[1]);
  colore(0,0,255);
  arrow(vSum.p[0],vSum.p[1],vSum2.p[0],vSum2.p[1]);
}

function drawSum3(){
  colore(255,0,0);
  v3.draw();
  let vSum = new vector(vadd(v3.p,v1.p)[0], vadd(v3.p,v1.p)[1]);
  let vSum2 = new vector(vadd(vSum.p,v2.p)[0], vadd(vSum.p,v2.p)[1]);
  colore(0,255,0);
  arrow(v3.p[0],v3.p[1],vSum.p[0],vSum.p[1]);
  colore(0,0,255);
  arrow(vSum.p[0],vSum.p[1],vSum2.p[0],vSum2.p[1]);
}

function drawSum4(){
  colore(255,0,0);
  v3.draw();
  let vSum = new vector(vadd(v3.p,v2.p)[0], vadd(v3.p,v2.p)[1]);
  let vSum2 = new vector(vadd(vSum.p,v1.p)[0], vadd(vSum.p,v1.p)[1]);
  colore(0,255,0);
  arrow(v3.p[0],v3.p[1],vSum.p[0],vSum.p[1]);
  colore(0,0,255);
  arrow(vSum.p[0],vSum.p[1],vSum2.p[0],vSum2.p[1]);
}

function drawSum5(){
  colore(255,0,0);
  v1.draw();
  let vSum = new vector(vadd(v1.p,v3.p)[0], vadd(v1.p,v3.p)[1]);
  let vSum2 = new vector(vadd(vSum.p,v2.p)[0], vadd(vSum.p,v2.p)[1]);
  colore(0,255,0);
  arrow(v1.p[0],v1.p[1],vSum.p[0],vSum.p[1]);
  colore(0,0,255);
  arrow(vSum.p[0],vSum.p[1],vSum2.p[0],vSum2.p[1]);
}

function drawSum6(){
  colore(255,0,0);
  v2.draw();
  let vSum = new vector(vadd(v2.p,v1.p)[0], vadd(v2.p,v1.p)[1]);
  let vSum2 = new vector(vadd(vSum.p,v3.p)[0], vadd(vSum.p,v3.p)[1]);
  colore(0,255,0);
  arrow(v2.p[0],v2.p[1],vSum.p[0],vSum.p[1]);
  colore(0,0,255);
  arrow(vSum.p[0],vSum.p[1],vSum2.p[0],vSum2.p[1]);
}

// funções que calculam as operações e mostram na tela o resultado
function showSum(){
  vResult = new vector(vadd(v1.p,v2.p)[0], vadd(v1.p,v2.p)[1]);
  colore(125,125,0);
  vResult.draw();
}

function showSub(){
  vResult = new vector(vsub(v1.p,v2.p)[0], vsub(v1.p,v2.p)[1]);
  colore(125,125,0);
  vResult.draw();
}

function showInv(){
  vResult = new vector(-v1.p[0],-v1.p[1]);
  colore(125,125,0);
  vResult.draw();
}

function showMul(){
  vResult = new vector(vmul(s,v1.p)[0], vmul(s,v1.p)[1]);
  colore(125,125,0);
  vResult.draw();
}

function showVdot(){
  vResult = vdot(v1.p,v2.p);
  colore(125,0,125)
  texto("O valor do produto escalar é: "+ vResult, -190, 180);
  if (vResult < 0){
    texto ("Ângulo entre vetores é > 90", -190, 160);
  } if (vResult > 0){
    texto ("Ângulo entre vetores é < 90", -190, 160);
  } if (vResult == 0){
    texto ("Vetores perpendiculares, ângulo = 90", -190, 160);
  }
}

function showVprod(){
  colore(125,0,125)
  texto("O valor no eixo Z do produto vetorial é: " +vprod(v1.p,v2.p)[2], -190, 180);
}

function setup() {
  createCanvas(400, 400);
  // setup de 3 vetores iniciais
  v1 = new vector(random(-100,100),random(-100,100));
  v2 = new vector(random(-100,100),random(-100,100));
  v3 = new vector(random(-100,100),random(-100,100));
  s = random(0,2);
}


function draw() {
  goCartesian()

  // 2 vetores são mostrados na tela, 
  // precisa descomentar a chamada da operação para ver o resultado na tela
  // ao apertar Q,W,E,R,T,Y, do teclado, são mostradas somas em ordens diferentes dos 3 vetores iniciais
  if(!isKeyPressed){
    colore(255,0,0);
    v1.draw();
    colore(0,0,255);
    v2.draw();

    // soma
    //showSum();

    // subtração
    //showSub();

    // vetor inverso
    //showInv();

    // multiplicação por escalar
    //showMul();

    // produto escalar
    //showVdot();

    // produto vetorial
    //showVprod();

  } 
  else {
    if(keyCode==81){
      drawSum();
    }
    if(keyCode==87){
      drawSum2();
    }
    if(keyCode==69){
      drawSum3();
    }
    if(keyCode==82){
      drawSum4();
    }
    if(keyCode==84){
      drawSum5();
    }
    if(keyCode==89){
      drawSum6();
    }
  }

}


function goCartesian()
{
  background(255)
 
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
 
  colore(128,0,0)
  arrow(0,height/2,width, height/2)
  colore(0,128,0)
  arrow(width/2,height,width/2, 0)
 
  translate(width/2,height/2)
  scale(1,-1,1)  
}

// atualiza as variáveis globais com as coordenadas do mouse no plano cartesiano
function grabMouse()
{
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

// renderiza texto corretamente no plano cartesiano
function texto(str,x,y)
{
  push()
	resetMatrix();
	translate(width/2,height/2)
	// desenha o texto normalmente
	text(str,x,-y)
  pop()
}


/* Define as cores de preenchimento e de contorno com o mesmo valor.
 * Há várias opções de trabalho em RGB nesse caso:
 *  - caso c1,c2,c3 e c4 sejam passados, o efeito padrão é uma cor RGBA
 *  - caso c1,c2 e c3 sejam passados, tem-se uma cor RGB.
 *  - caso c1 e c2 sejam passados, c1 é um tom de cinza e c2 é opacidade.
 *  - caso apenas c1 seja passado, c1 é um tom de cinza.
 */
function colore(c1,c2,c3,c4)
{
  if(c4 != null)
  {
	fill(c1,c2,c3,c4)
	stroke(c1,c2,c3,c4)
	return
  }
  if(c3 != null)
  {
	fill(c1,c2,c3)
	stroke(c1,c2,c3)
	return
  }
 
  if(c2 == null )
  {
	fill(c1)
	stroke(c1)
  }
  else
  {
	fill(c1,c1,c1,c2)
	stroke(c1,c1,c1,c2)
  }    
}

/* Desenha um segmento de reta com seta do ponto (x1,y1) para (x2,y2)
 */
function arrow(x1,y1,x2,y2)
{
  line(x1,y1,x2,y2)
  var dx = x2-x1, dy = y2-y1
  var le = sqrt(dx*dx + dy*dy)
  var vx = dx/le, vy = dy/le
  var ux = -vy
  var uy = vx
  triangle(x2,y2,
       	x2-5*vx+2*ux, y2-5*vy+2*uy,
       	x2-5*vx-2*ux, y2-5*vy-2*uy)
}

