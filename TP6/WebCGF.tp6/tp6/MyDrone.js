/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene,posX,posY,posZ) {
 	CGFobject.call(this,scene);

    this.posX = posX;
    this.posY = posY;
    this.posZ = posZ;
 	this.initBuffers();
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.initBuffers = function() {
 	this.vertices = [
 	this.posX, this.posY, this.posZ,
 	this.posX-1, this.posY, this.posZ,
 	this.posX-0.5, this.posY, this.posZ+2
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

/*MyDrone.prototype.display = function() {
    
};*/

MyDrone.prototype.update = function(direction) {
    switch(direction){
        case 'up':
            console.log("Going up");
            this.posY += 0.5;
            break;
        case 'down':
            console.log("Going down");
            this.posY -= 0.5;
            break;
    }
}
