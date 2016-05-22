/**
 * MyDrone
 * @constructor
 */

 var degToRad = Math.PI / 180.0;
 function MyDrone(scene) {
 	CGFobject.call(this, scene);

    //initial position
    this.posX = 4;
    this.posY = 5;
    this.posZ = 6;
    this.facingAngle = 180;
  
 	this.semisphere = new MySemisphere(this.scene, 64, 10);
 	this.cylinder = new MyCylinder(this.scene, 16, 5);
 	this.cube = new MyUnitCubeQuad(this.scene);
 	this.propellerFront = new MyPropeller(this.scene, true);
 	this.propellerRear = new MyPropeller(this.scene, true);
 	this.propellerSides = new MyPropeller(this.scene, false);
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.display = function()
 {
 	// drone body
 	this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.materialA.apply();
		this.semisphere.display();
 	this.scene.popMatrix();

 	// drone longitudinal arm
 	this.scene.pushMatrix();
		this.scene.scale(0.03, 0.03, 1.5);
		this.scene.translate(0, 0, -0.5);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0, -0.05, 0.75);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, .1);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0, 0.05, 0.75);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.materialA.apply();
		this.propellerFront.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0, -0.05, -0.75);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, .1);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0, 0.05, -0.75);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.materialA.apply();
		this.propellerRear.display();
 	this.scene.popMatrix();

 	// drone transversal arm
 	this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad, 0, 1, 0);
		this.scene.scale(0.03, 0.03, 1.5);
		this.scene.translate(0, 0, -0.5);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(-0.75, -0.05, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, .1);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(-0.75, 0.05, 0);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.materialA.apply();
		this.propellerSides.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0.75, -0.05, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, .1);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0.75, 0.05, 0);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.materialA.apply();
		this.propellerSides.display();
 	this.scene.popMatrix();

 	// drone right foot
 	this.scene.pushMatrix();
 		this.scene.translate(-0.3, -0.3, 0);
		this.scene.scale(0.03, 0.03, 1);
		this.scene.materialA.apply();
		this.cube.display();
 	this.scene.popMatrix();

 	// drone left foot
 	this.scene.pushMatrix();
 		this.scene.translate(0.3, -0.3, 0);
		this.scene.scale(0.03, 0.03, 1);
		this.scene.materialA.apply();
		this.cube.display();
 	this.scene.popMatrix();



 }

MyDrone.prototype.move = function(direction) {
    switch(direction){
        case 'up':
            console.log("Going up");
            this.posY += 0.1;
            break;
        case 'down':
            console.log("Going down");
            this.posY -= 0.1;
            break;
        case 'left':
            console.log("Rotating left");
            this.facingAngle += 1;
            break;
        case 'right':
            console.log("Rotating right");
            this.facingAngle -= 1;
            break;
        case 'forward':
            console.log("Going forward");
            this.posZ += Math.cos(this.facingAngle * degToRad) * 0.1;
            this.posX += Math.sin(this.facingAngle * degToRad) * 0.1;
            break;
        case 'back':
            console.log("Going back");
            this.posZ -= Math.cos(this.facingAngle * degToRad) * 0.1;
            this.posX -= Math.sin(this.facingAngle * degToRad) * 0.1;
            break;
    }
}

MyDrone.prototype.update = function(currTime) {
	this.propellerFront.update(currTime);
 	this.propellerRear.update(currTime);
 	this.propellerSides.update(currTime);
}
