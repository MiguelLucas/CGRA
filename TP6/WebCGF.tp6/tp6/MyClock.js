/**
 * MyClock
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);
	
	this.clockBody = new MyCylinder(this.scene, 12, 1);
	this.clockFace = new MyCircle(this.scene, 12);
	this.clockHandHours = new MyClockHand(this.scene, 0.25, 0.02);
	this.clockHandMinutes = new MyClockHand(this.scene, 0.35, 0.02);
	this.clockHandSeconds = new MyClockHand(this.scene, 0.45, 0.01);

	this.clockHandHours.setAngle(90);
	this.clockHandMinutes.setAngle(180);
	this.clockHandSeconds.setAngle(270);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
	this.clockAppearance.setShininess(120);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function () {

	//clockBody
	this.scene.pushMatrix();
	this.scene.scale(.5, .5, 0.1);
	this.scene.materialDefault.apply();
	this.clockBody.display();
	this.scene.popMatrix();

	//clockFace
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 0.1);
	this.clockAppearance.apply();
	this.clockFace.display();
	this.scene.popMatrix();

	//clockHandHours
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 0.101);
	this.clockHandHours.display();
	this.scene.popMatrix();

	//clockHandMinutes
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 0.101);
	this.clockHandMinutes.display();
	this.scene.popMatrix();

	//clockHandSeconds
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 0.101);
	this.clockHandSeconds.display();
	this.scene.popMatrix();
};

MyClock.prototype.update = function (time) {
    var secAng = Math.floor(time/1000 % 60) * 360/60;
    var minAng = (time/(1000*60) % 60) * 360/60;
    var hourAng = (time/(1000*60*60) % 24) * 360/24;
    this.clockHandHours.setAngle(hourAng);
	this.clockHandMinutes.setAngle(minAng);
	this.clockHandSeconds.setAngle(secAng);
}