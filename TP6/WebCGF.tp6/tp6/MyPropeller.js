/**
 * MyPropeller
 * @constructor
 */

 var degToRad = Math.PI / 180.0;
 function MyPropeller(scene, isClockwise) {
 	CGFobject.call(this, scene);

 	this.rotationDir = 1;
 	if(!isClockwise)
 	  this.rotationDir = -1;

 	this.rotationSpeeds = {
 	    SLOW : 0.2,
 	    NORMAL : 1,
 	    FAST : 10
 	}

 	this.rotationSpeed = this.rotationSpeeds.NORMAL;
 	this.angle = 0;
 	this.previousInstant = 0;

 	this.semisphere = new MySemisphere(this.scene, 16, 5);
 	this.cylinder = new MyCylinder(this.scene, 8, 5);

 };

 MyPropeller.prototype = Object.create(CGFobject.prototype);
 MyPropeller.prototype.constructor = MyDrone;

 MyPropeller.prototype.display = function()
 {
 	// propeller center
 	this.scene.pushMatrix();
 	 	this.scene.rotate(this.angle*degToRad, 0, 1, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.materialA.apply();
		this.semisphere.display();
 	this.scene.popMatrix();

 	// propeller blade 1
 	this.scene.pushMatrix();
 	 	this.scene.rotate(this.angle*degToRad, 0, 1, 0);
 	    this.scene.translate(0, 0.15, 0);
 	    this.scene.rotate(30*degToRad*this.rotationDir, 0, 0, 1);
		this.scene.scale(.3, 0.1, 4);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	// propeller blade 2
 	this.scene.pushMatrix();
 	 	this.scene.rotate(this.angle*degToRad, 0, 1, 0);
 	 	this.scene.translate(0, 0.15, 0);
 	 	this.scene.rotate(180*degToRad, 0, 1, 0);
 	    this.scene.rotate(30*degToRad*this.rotationDir, 0, 0, 1);
		this.scene.scale(.3, 0.1, 4);
		this.scene.materialA.apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 }

 MyPropeller.prototype.update = function(t) {
     var t0 = this.previousInstant;
     this.previousInstant = t;
     //this.angle = (this.angle + (t-t0)/1000*this.rotationSpeed*this.rotationDir * 360) % 360;
     this.angle = ((t)/1000*this.rotationSpeed*this.rotationDir * 360) % 360;
}