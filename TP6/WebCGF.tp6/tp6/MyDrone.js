/**
 * MyDrone
 * @constructor
 */

 var degToRad = Math.PI / 180.0;
 function MyDrone(scene) {
 	CGFobject.call(this,scene);

    //initial position
    this.posX = 4;
    this.posY = 5;
    this.posZ = 6;
    this.facingAngle = 180;
  
 	this.initBuffers();
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.initBuffers = function() {
 	this.vertices = [
 	0.5, 0.3, 0,
 	-0.5, 0.3, 0,
 	0, 0.3, 2
 	];

 	this.indices = [
 	0, 1, 2,
 	2, 1, 0
 	];

    this.normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    ]
    
  /* this.texCoords = [
    this.minS, this.maxT, //(0,1)
    this.maxS,  this.maxT, //(1,1)
    this.minS,  this.minT  
    ]*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };


MyDrone.prototype.update = function(direction) {
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
