/**
 * MyClock
 * @constructor
 */
 function MyClock(scene) {
 	CGFobject.call(this, scene);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
	this.clockAppearance.setShininess(120);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

	this.material = new CGFappearance(this.scene);
	this.material.setAmbient(0,0,0,1);
	this.material.setDiffuse(0,0,0,1);
	this.material.setSpecular(0,0,0,1);	
	this.material.setShininess(0);

 	this.clock = new MyCylinder(this.scene, 12,1);
	
	this.clockDisplay = new MyForm(this.scene, 12,1);
	
	this.hoursClockHand = new MyClockHand(this.scene, 'HOURS');
	this.minutesClockHand = new MyClockHand(this.scene, 'MINUTES');
	this.secondsClockHand = new MyClockHand(this.scene, 'SECONDS');

	this.hours = 0;
	this.minutes = 0;
	this.seconds = 0;
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {

 	this.scene.pushMatrix();
 	  this.scene.scale(.5, .5, 0.2);
 	  this.scene.materialDefault.apply();
 	  this.clock.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
 	  this.scene.scale(.5, .5, 0.2);
 	  this.clockAppearance.apply();
 	  this.clockDisplay.display();
 	this.scene.popMatrix();

//HOURS

    this.scene.pushMatrix();
 	  this.material.apply();
 	  this.hoursClockHand.display();
 	this.scene.popMatrix();

//MINUTES

 	this.scene.pushMatrix();
 	 this.minutesClockHand.display();
 	this.scene.popMatrix();

//SECONDS

 	this.scene.pushMatrix();
 	  this.secondsClockHand.display();
 	this.scene.popMatrix();
 	  
 };

MyClock.prototype.update = function(currTime) {

this.hours   = ((currTime / (1000*60*60)) % 24);
this.minutes = ((currTime / (1000*60)) % 60);
this.seconds = (currTime / 1000) % 60 ;


//HOURS
 	  this.hoursClockHand.setAngle(this.hours*30);
 	  //console.log("currTime hours:"+this.hours);

//MINUTES
 	  this.minutesClockHand.setAngle(this.minutes*6);
 	  //console.log("currTime minutes:"+this.minutes);

//SECONDS
 	  this.secondsClockHand.setAngle(this.seconds*6);
 	  //console.log("currTime seconds:"+this.seconds);
};