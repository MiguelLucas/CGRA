/**
 * MyClockHand
 * @constructor
 */
 function MyClockHand(scene, type) {
 	CGFobject.call(this,scene);

    this.angle=0;
 	this.clockHand = new MyQuad(this.scene);
    this.type = type;
 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function() {

   	if (this.type == 'HOURS') {
   	  this.scene.rotate(-this.angle * degToRad, 0, 0, 1);
 	  this.scene.translate(0, 0.1, 0.21);
 	  this.scene.scale(.025, 0.2, 1)
 	  this.clockHand.display();
 	}
 	else if (this.type == 'MINUTES') {
 	  this.scene.rotate(-this.angle * degToRad, 0, 0, 1);
 	  this.scene.translate(0, 0.15, 0.21);
 	  this.scene.scale(.025, 0.30, 1);
 	  this.clockHand.display();
 	}
 	else if (this.type == 'SECONDS') {
   	  this.scene.rotate(-this.angle * degToRad, 0, 0, 1);
      this.scene.translate(0, 0.2, 0.2);
      this.scene.scale(.025, 0.40, 1);
      this.clockHand.display();
 	}  
};

MyClockHand.prototype.setAngle = function(angle) {
    
      this.angle = angle;

};