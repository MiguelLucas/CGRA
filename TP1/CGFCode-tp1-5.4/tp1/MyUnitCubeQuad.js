/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	  CGFobject.call(this,scene);
    this.quad = new MyQuad(scene);
    this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function (){

	//x = vermelho
	//y = verde
	//z = azul

	//face de cima
	this.scene.pushMatrix();
    this.scene.translate(0,0,0.5);
    this.quad.display();

    //face de baixo
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0,0,-0.5);
    this.scene.rotate(Math.PI,1,0,0);
    this.quad.display();

    //face da esquerda
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();

    //face da direita
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();

    //face da frente
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();

    //face de tras
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();

    this.scene.popMatrix();
}