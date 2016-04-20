/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	  CGFobject.call(this,scene);
	  this.cube = new MyUnitCubeQuad(scene);
      this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function (){

	//x = vermelho
	//y = verde
	//z = azul

	//pernas

    this.scene.pushMatrix();
    this.scene.translate(0,1.75,0);
	this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,1.75,2.7);
	this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(4.7,1.75,0);
	this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(4.7,1.75,2.7);
	this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //tampo

    this.scene.pushMatrix();
    //x=(5/2)-(0.3/2)
    //y=3.5+(0.3/2)
    //z=(3.3/2)-0.3
    this.scene.translate(2.35,3.65,1.35);
	this.scene.scale(5,0.3,3);
    this.cube.display();
    this.scene.popMatrix();

}