/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFloor(scene) {
	  CGFobject.call(this,scene);
	  this.cube = new MyUnitCubeQuad(scene);
      this.cube.initBuffers();
};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor=MyFloor;

MyFloor.prototype.display = function (){

	//x = vermelho
	//y = verde
	//z = azul

    this.scene.pushMatrix();
    this.scene.translate(4,0.05,3)
	this.scene.scale(8,0.1,6);
    this.cube.display();
    this.scene.popMatrix();

}