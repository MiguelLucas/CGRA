var degToRad = Math.PI / 180.0;

/**
 * MyCable
 * @constructor
 */
function MyCable(scene) {
    CGFobject.call(this, scene);
    
    this.cable = new MyCylinder(this.scene,16,3,false,false);
    this.hook = new MyUnitCubeQuad(this.scene);
    
    //position
    this.hookPosZ = 2;
    this.cableLength = .5;
    this.minCableLength = .5;
    this.maxCableLength = 5;
    
    //movement
    this.previousInstant = Date.now();
    this.loweringCable = false;
    this.liftingCable = false;
    this.speed = 0.002;
}
;

MyCable.prototype = Object.create(CGFobject.prototype);
MyCable.prototype.constructor = MyCable;

MyCable.prototype.display = function() 
{
    // cable
    this.scene.pushMatrix();
    this.scene.rotate(90 * degToRad, 1, 0, 0);
    this.scene.scale(.02, .02, this.cableLength);
    this.scene.metalAppearance.apply();
    this.cable.display();
    this.scene.popMatrix();
    
    // hook
    this.scene.pushMatrix();
    this.scene.translate(0, -this.cableLength, 0);
    this.scene.scale(.1, .1, .1);
    this.hook.display();
    this.scene.popMatrix();
}

MyCable.prototype.lift = function() 
{
    this.liftingCable = true;
}

MyCable.prototype.stoplift = function() 
{
    this.liftingCable = false;
}

MyCable.prototype.lower = function() 
{
    this.loweringCable = true;
}

MyCable.prototype.stoplower = function() 
{
    this.loweringCable = false;
}

MyCable.prototype.update = function(t) 
{
    var deltaT = t - this.previousInstant;
    this.previousInstant = t;
    
    if (this.liftingCable)
        this.cableLength -= deltaT * this.speed;
    if (this.loweringCable)
        this.cableLength += deltaT * this.speed;
        
    if (this.cableLength < this.minCableLength)
        this.cableLength = this.minCableLength;
    if (this.cableLength > this.maxCableLength)
        this.cableLength = this.maxCableLength;
}
