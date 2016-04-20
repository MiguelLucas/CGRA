/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.materialSteel = new CGFappearance(this.scene);
	this.materialSteel.setAmbient(0.3,0.3,0.3,1);
	this.materialSteel.setDiffuse(0.88,0.87,0.86,1);
	this.materialSteel.setSpecular(0.9,0.9,0.9,1);	
	this.materialSteel.setShininess(120);

	this.materialWood = new CGFappearance(this.scene);
	this.materialWood.setAmbient(0.3,0.3,0.3,1);
	this.materialWood.setDiffuse(0.55,0.45,0.33,1);
	this.materialWood.setSpecular(0.1,0.1,0.1,1);	
	this.materialWood.setShininess(10);

	this.cube = new MyUnitCubeQuad(scene);
	this.cube.initBuffers();

     
};

	

MyTable.prototype.display = function (){

	 
	//x = vermelho
	//y = verde
	//z = azul

	//pernas

    this.scene.pushMatrix();
    this.scene.translate(0.15,1.75,0.15);
	this.scene.scale(0.3,3.5,0.3);
	this.materialSteel.apply();
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.15,1.75,2.55);
	this.scene.scale(0.3,3.5,0.3);
	this.materialSteel.apply();
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(4.55,1.75,0.15);
	this.scene.scale(0.3,3.5,0.3);
	this.materialSteel.apply();
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(4.55,1.75,2.55);
	this.scene.scale(0.3,3.5,0.3);
	this.materialSteel.apply();
    this.cube.display();
    this.scene.popMatrix();

    //tampo

    this.scene.pushMatrix();
    //x=(5/2)-(0.3/2)
    //y=3.5+(0.3/2)
    //z=(3.3/2)-0.3
    this.scene.translate(2.35,3.65,1.35);
	this.scene.scale(5,0.3,3);
	this.materialWood.apply();
    this.cube.display();
    this.scene.popMatrix();

}