 MyPropeller.rotationSpeeds =
 {
 	VERYVERYSLOW : 0.05,
 	VERYSLOW : 0.1,
 	SLOW : 0.2,
 	NORMAL : 1,
 	FAST : 10,
 	VERYFAST : 14,
 	VERYVERYFAST : 16
 };

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

 	this.rotationSpeed = MyPropeller.rotationSpeeds.NORMAL;
 	this.angle = 0;
 	this.previousInstant = Date.now();

 	this.semisphere = new MySemisphere(this.scene, 16, 5);
 	this.cylinder = new MyCylinder(this.scene, 8, 5, true, true);

 };

 MyPropeller.prototype = Object.create(CGFobject.prototype);
 MyPropeller.prototype.constructor = MyDrone;

 MyPropeller.prototype.display = function()
 {
 	// propeller center
 	this.scene.pushMatrix();
 	 	this.scene.rotate(this.angle*degToRad, 0, 1, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.5,0.5,0.5);
		this.scene.dronePropellerCenterAppearance[this.scene.currDroneAppearance].apply();
		this.semisphere.display();
 	this.scene.popMatrix();

 	// propeller blade 1
 	this.scene.pushMatrix();
 	 	this.scene.rotate(this.angle*degToRad, 0, 1, 0);
 	    this.scene.translate(0, 0.15, 0);
 	    this.scene.rotate(30*degToRad*this.rotationDir, 0, 0, 1);
		this.scene.scale(.3, 0.1, 4);
		this.scene.dronePropellerBladesAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 	// propeller blade 2
 	this.scene.pushMatrix();
 	 	this.scene.rotate(this.angle*degToRad, 0, 1, 0);
 	 	this.scene.translate(0, 0.15, 0);
 	 	this.scene.rotate(180*degToRad, 0, 1, 0);
 	    this.scene.rotate(30*degToRad*this.rotationDir, 0, 0, 1);
		this.scene.scale(.3, 0.1, 4);
		this.scene.dronePropellerBladesAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();

 }

 MyPropeller.prototype.update = function(t) {
 	var deltaT = t - this.previousInstant;
 	this.previousInstant = t;
 	this.angle = (this.angle + deltaT/1000*this.rotationSpeed*360*this.rotationDir) % 360;
 	//this.angle = ((t)/1000*this.rotationSpeed*this.rotationDir * 360) % 360;
 }

  MyPropeller.prototype.increaseSpeed = function() {
     switch(this.rotationSpeed){
     	case MyPropeller.rotationSpeeds.VERYVERYSLOW:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.VERYSLOW;
     		break;
     	case MyPropeller.rotationSpeeds.VERYSLOW:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.SLOW;
     		break;
     	case MyPropeller.rotationSpeeds.SLOW:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.NORMAL;
     		break;
     	case MyPropeller.rotationSpeeds.NORMAL:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.FAST;
     		break;
     	case MyPropeller.rotationSpeeds.FAST:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.VERYFAST;
     		break;
     	case MyPropeller.rotationSpeeds.VERYFAST:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.VERYVERYFAST;
     		break;
     }
 }

 MyPropeller.prototype.decreaseSpeed = function() {
     switch(this.rotationSpeed){
     	case MyPropeller.rotationSpeeds.VERYVERYFAST:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.VERYFAST;
     		break;
     	case MyPropeller.rotationSpeeds.VERYFAST:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.FAST;
     		break;
     	case MyPropeller.rotationSpeeds.FAST:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.NORMAL;
     		break;
     	case MyPropeller.rotationSpeeds.NORMAL:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.SLOW;
     		break;
     	case MyPropeller.rotationSpeeds.SLOW:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.VERYSLOW;
     		break;
     	case MyPropeller.rotationSpeeds.VERYSLOW:
     		this.rotationSpeed = MyPropeller.rotationSpeeds.VERYVERYSLOW;
     		break;
     }
 }