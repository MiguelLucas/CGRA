var degToRad = Math.PI / 180.0;

/**
 * MyDropSpot
 * @constructor
 */
function MyDropSpot(scene) {
    CGFobject.call(this, scene);
    
    this.circle = new MyCircle(this.scene, 32);

    this.radious = 1;
    this.posX = 12;
    this.posY = 0.01;
    this.posZ = 12;   
};

MyDropSpot.prototype = Object.create(CGFobject.prototype);
MyDropSpot.prototype.constructor = MyDropSpot;

MyDropSpot.prototype.display = function() 
{
    // dropspot
    this.scene.pushMatrix();
    this.scene.translate(this.posX, this.posY, this.posZ);
    this.scene.scale(this.radious, 1, this.radious);
    this.scene.rotate(-90*degToRad, 1, 0, 0);
    this.scene.targetAppearance.apply();
    this.circle.display();
    this.scene.popMatrix();  
};

MyDropSpot.prototype.getPosition = function() 
{
    return {
        "x": this.posX,
        "y": this.posY,
        "z": this.posZ,
        "radious" : this.radious
    };
};