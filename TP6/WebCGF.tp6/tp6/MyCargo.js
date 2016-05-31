/**
 * MyCargo
 * @constructor
 */
function MyCargo(scene) {
    CGFobject.call(this, scene);
    
    this.cube = new MyUnitCubeQuad(this.scene);

    this.length = 0.5;
    this.width = 0.5;
    this.height = 0.5;

    this.posX = 12.5;
    this.posY = 3.7;
    this.posZ = 8;

    this.picked = false;
    this.delivered = false;    
};

MyCargo.prototype = Object.create(CGFobject.prototype);
MyCargo.prototype.constructor = MyCargo;

MyCargo.prototype.display = function() 
{
    // cargo
    this.scene.pushMatrix();
    this.scene.translate(this.posX, this.posY, this.posZ);
    this.scene.scale(this.length, this.height, this.width);
    this.scene.translate(0, 0.5, 0);
    if (this.delivered == true)
        this.scene.orange.apply();
    else if (this.picked == true)
        this.scene.red.apply();
    else
        this.scene.orange.apply();
    this.cube.display();
    this.scene.popMatrix();  
};

MyCargo.prototype.getPosition = function() 
{
    if ( this.picked == false)
    return {        
        "xMin": this.posX - this.length/2,
        "yMin": this.posY,
        "zMin": this.posZ - this.width/2,
        "xMax": this.posX + this.length/2,
        "yMax": this.posY + this.height,
        "zMax": this.posZ + this.width/2
    };

    else
        return {        
        "x": this.posX,
        "y": this.posY,
        "z": this.posZ
    };
};

MyCargo.prototype.update = function(pos) 
{
    this.posX = pos.x;
    this.posY = pos.y - this.height;
    this.posZ = pos.z;
};

MyCargo.prototype.drop = function(pos) 
{
    this.posX = pos.x;
    this.posY = pos.y;
    this.posZ = pos.z;
};