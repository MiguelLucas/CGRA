/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene, length, thickness) {
	CGFobject.call(this,scene);
	
	this.hand = new MyQuad(this.scene, 0, 1, 0, 1);
	this.angle = 0;
	this.length = length;
	this.thickness = thickness;

	this.handAppearance = new CGFappearance(this.scene);
	this.handAppearance = new CGFappearance(this.scene);
	this.handAppearance.setAmbient(0.1, 0.1, 0.1, 1);
	this.handAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
	this.handAppearance.setSpecular(0, 0, 0, 1);
	this.handAppearance.setShininess(10);

	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function () {

	this.scene.pushMatrix();
	this.scene.rotate(- this.angle * degToRad, 0, 0, 1);
	this.scene.scale(this.thickness, this.length, 1);
	this.scene.translate(0, 0.5, 0);
	this.handAppearance.apply();
	this.hand.display();
	this.scene.popMatrix();

};

MyClockHand.prototype.setAngle = function(angle) {    
      this.angle = angle;
};
