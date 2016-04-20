/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
 	CGFobject.call(this, scene);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.loadTexture("../resources/images/table.png");

	this.legsAppearance = new CGFappearance(this.scene);
	this.legsAppearance.loadTexture("../resources/images/metal.jpg");
	this.legsAppearance.setDiffuse(0.88,0.87,0.86,1);
	this.legsAppearance.setSpecular(0.9,0.9,0.9,1);	
	this.legsAppearance.setShininess(120);
	
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

 	this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
 	this.myUnitCubeQuad.initBuffers();

 	
 };

 MyTable.prototype = Object.create(CGFobject.prototype);
 MyTable.prototype.constructor = MyTable;

 MyTable.prototype.display = function() {
 	// legs
 	this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		//this.materialSteel.apply();
		this.legsAppearance.apply();
		this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		//this.materialSteel.apply();
		this.legsAppearance.apply();
		this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		//this.materialSteel.apply();
		this.legsAppearance.apply();
		this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		//this.materialSteel.apply();
		this.legsAppearance.apply();
		this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	// table top
 	this.scene.pushMatrix();
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);
		//this.materialWood.apply();
		this.tableAppearance.apply();
		this.myUnitCubeQuad.display();
 	this.scene.popMatrix();
 }
