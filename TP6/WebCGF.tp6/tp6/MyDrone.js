/**
 * MyDrone
 * @constructor
 */

var degToRad = Math.PI / 180.0;
function MyDrone(scene) {
    CGFobject.call(this, scene);
    
	this.semisphere = new MySemisphere(this.scene,64,50);
    this.cylinder = new MyCylinder(this.scene,16,5,true,true);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.propellerFront = new MyPropeller(this.scene,true);
    this.propellerRear = new MyPropeller(this.scene,true);
    this.propellerSides = new MyPropeller(this.scene,false);
    this.leg = new MyCubicSurface(this.scene, 0, 1, 1, 1, 1, 0);
    this.cable = new MyCable(this.scene);
    
    //position
    this.posX = 4;
    this.posY = 5;
    this.posZ = 6;
    this.facingAngle = 180;
    this.pitchAngle = 0;
    this.maxPitchAngle = 20;
    
    //movement
    this.previousInstant = Date.now();
    this.movingForward = false;
    this.movingBackwards = false;
    this.movingUp = false;
    this.movingDown = false;
    this.rotatingLeft = false;
    this.rotatingRight = false;

    this.rotationSpeed = 0;
    this.horSpeed = 0;
    this.verSpeed = 0;
	this.maxSpeed = 0.006;
    this.maxRotSpeed = 0.1;

    this.acceleration = 0.0002;
    this.rotationAcceleration = 0.005;
    
    this.horDeceleration = false;
    this.verDeceleration = false;
    this.rotDeceleration = false;
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.display = function() 
{
    // whole drone
    this.scene.pushMatrix();
        this.scene.translate(this.posX, this.posY, this.posZ);
        this.scene.rotate(this.facingAngle * degToRad, 0, 1, 0);
        this.cable.display();
        this.scene.rotate(this.pitchAngle * degToRad, 1, 0, 0);
        this.scene.scale(2,2,2);
   
    //drone body
    this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.25, 0.25, 0.25);
		this.scene.droneBodyAppearance[this.scene.currDroneAppearance].apply();
		this.semisphere.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.scene.scale(0.25, 0.25, 0.025);
        this.scene.droneBodyAppearance[this.scene.currDroneAppearance].apply();
        this.semisphere.display();
    this.scene.popMatrix();

 	// drone longitudinal arm
 	this.scene.pushMatrix();
		this.scene.scale(0.03, 0.03, 1.5);
		this.scene.translate(0, 0, -0.5);
		this.scene.droneLongitudalArmAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();

	//drone longitudinal arm base 1
 	this.scene.pushMatrix();
 		this.scene.translate(0, -0.05, 0.75);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.droneBaseAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();
	
	//drone longitudinal arm base 1 propeller
 	this.scene.pushMatrix();
 		this.scene.translate(0, 0.05, 0.75);
		this.scene.scale(0.1, 0.1, 0.1);
		this.propellerFront.display();
 	this.scene.popMatrix();

	//drone longitudinal arm base 2
 	this.scene.pushMatrix();
 		this.scene.translate(0, -0.05, -0.75);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, .1);
		this.scene.droneBaseAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();

	//drone longitudinal arm base 2 propeller
 	this.scene.pushMatrix();
 		this.scene.translate(0, 0.05, -0.75);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.materialA.apply();
		this.propellerRear.display();
 	this.scene.popMatrix();

 	// drone transversal arm
 	this.scene.pushMatrix();
		this.scene.rotate(-90*degToRad, 0, 1, 0);
		this.scene.scale(0.03, 0.03, 1.5);
		this.scene.translate(0, 0, -0.5);
		this.scene.droneTransversalArmAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();

	//drone transversal arm base 1
 	this.scene.pushMatrix();
 		this.scene.translate(-0.75, -0.05, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, .1);
		this.scene.droneBaseAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();

	//drone transversal arm base 1 propeller
 	this.scene.pushMatrix();
 		this.scene.translate(-0.75, 0.05, 0);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.materialA.apply();
		this.propellerSides.display();
 	this.scene.popMatrix();

	//drone transversal arm base 2
 	this.scene.pushMatrix();
 		this.scene.translate(0.75, -0.05, 0);
		this.scene.rotate(-90*degToRad, 1, 0, 0);
		this.scene.scale(0.1, 0.1, .1);
		this.scene.droneBaseAppearance[this.scene.currDroneAppearance].apply();
		this.cylinder.display();
 	this.scene.popMatrix();

	//drone transversal arm base 2 propeller
 	this.scene.pushMatrix();
 		this.scene.translate(0.75, 0.05, 0);
		this.scene.scale(0.1, 0.1, 0.1);
		this.scene.materialA.apply();
		this.propellerSides.display();
 	this.scene.popMatrix();

 	// drone right foot
 	this.scene.pushMatrix();
 		this.scene.translate(-0.3, -0.3, 0);
		this.scene.scale(0.03, 0.03, 1);
		this.scene.droneFootAppearance[this.scene.currDroneAppearance].apply();
		this.cube.display();
 	this.scene.popMatrix();

 	// drone left foot
 	this.scene.pushMatrix();
 		this.scene.translate(0.3, -0.3, 0);
		this.scene.scale(0.03, 0.03, 1);
		this.scene.droneFootAppearance[this.scene.currDroneAppearance].apply();
		this.cube.display();
 	this.scene.popMatrix();

 	// drone front leg
 	this.scene.pushMatrix();
 		this.scene.translate(-0.3, -0.3, 0.1);
		this.scene.scale(0.6, 0.36, 0.05);
		this.scene.droneFootAppearance[this.scene.currDroneAppearance].apply();
		this.leg.display();
 	this.scene.popMatrix();

 	// drone back leg
 	this.scene.pushMatrix();
 		this.scene.translate(-0.3, -0.3, -0.15);
		this.scene.scale(0.6, 0.36, 0.05);
		this.scene.droneFootAppearance[this.scene.currDroneAppearance].apply();
		this.leg.display();
 	this.scene.popMatrix();
    
    this.scene.popMatrix();
};

MyDrone.prototype.move = function(direction) {
    switch (direction) {
    case 'up':
        if (this.movingUp != true) {
            this.movingUp = true;
            this.propellerFront.increaseSpeed();
            this.propellerRear.increaseSpeed();
            this.propellerSides.increaseSpeed();
        }
        break;
    case 'down':
        if (this.movingDown != true) {
            this.movingDown = true;
            this.propellerFront.decreaseSpeed();
            this.propellerRear.decreaseSpeed();
            this.propellerSides.decreaseSpeed();
        }
        break;
    case 'left':
        if (this.rotatingLeft != true) {
            this.rotatingLeft = true;
            this.propellerFront.decreaseSpeed();
            this.propellerRear.decreaseSpeed();
            this.propellerSides.increaseSpeed();
        }
        break;
    case 'right':
        if (this.rotatingRight != true) {
            this.rotatingRight = true;
            this.propellerFront.increaseSpeed();
            this.propellerRear.increaseSpeed();
            this.propellerSides.decreaseSpeed();
        }
        break;
    case 'forward':
        if (this.movingForward != true) {
            this.movingForward = true;
            this.propellerFront.decreaseSpeed();
            this.propellerRear.increaseSpeed();
        }
        break;
    case 'back':
        if (this.movingBackwards != true) {
            this.movingBackwards = true;
            this.propellerFront.increaseSpeed();
            this.propellerRear.decreaseSpeed();
        }
        break;
    }
};

MyDrone.prototype.stop = function(direction) {
    switch (direction) {
    case 'up':
        if (this.movingUp != false) {
            this.movingUp = false;
            this.propellerFront.decreaseSpeed();
            this.propellerRear.decreaseSpeed();
            this.propellerSides.decreaseSpeed();
            this.verDeceleration = true;
        }
        break;
    case 'down':
        if (this.movingDown != false) {
            this.movingDown = false;
            this.propellerFront.increaseSpeed();
            this.propellerRear.increaseSpeed();
            this.propellerSides.increaseSpeed();
            this.verDeceleration = true;
        }
        break;
    case 'left':
        if (this.rotatingLeft != false) {
            this.rotatingLeft = false;
            this.propellerFront.increaseSpeed();
            this.propellerRear.increaseSpeed();
            this.propellerSides.decreaseSpeed();
            this.rotDeceleration = true;
        }
        break;
    case 'right':
        if (this.rotatingRight != false) {
            this.rotatingRight = false;
            this.propellerFront.decreaseSpeed();
            this.propellerRear.decreaseSpeed();
            this.propellerSides.increaseSpeed();
            this.rotDeceleration = true;
        }
        break;
    case 'forward':
        if (this.movingForward != false) {
            this.movingForward = false;
            this.propellerFront.increaseSpeed();
            this.propellerRear.decreaseSpeed();
            this.horDeceleration = true;
        }
        break;
    case 'back':
        if (this.movingBackwards != false) {
            this.movingBackwards = false;
            this.propellerFront.decreaseSpeed();
            this.propellerRear.increaseSpeed();
            this.horDeceleration = true;
        }
        break;
    }
};

MyDrone.prototype.update = function(t) 
{
    var deltaT = t - this.previousInstant;
    this.previousInstant = t;
    
	//atualização da posição do drone
    //descomentar valores seguintes para que drone se mova de acordo com velocidade do slider da GUI
    this.posZ += Math.cos(this.facingAngle * degToRad) * deltaT * this.horSpeed/* * this.scene.speed*/;
    this.posX += Math.sin(this.facingAngle * degToRad) * deltaT * this.horSpeed/* * this.scene.speed*/;
    this.posY += deltaT * this.verSpeed/* * this.scene.speed*/;
    this.facingAngle += deltaT * this.rotationSpeed/* * this.scene.speed*/;
    
	//handlers dos movimentos
    if (this.movingForward) {
        if (this.pitchAngle < this.maxPitchAngle)
            this.pitchAngle += deltaT / 25;
        if (this.pitchAngle > this.maxPitchAngle)
            this.pitchAngle = this.maxPitchAngle;
        this.horSpeed += this.acceleration;
    } 
    else if (this.movingBackwards) {
        if (this.pitchAngle > -this.maxPitchAngle)
            this.pitchAngle -= deltaT / 25;
        if (this.pitchAngle < -this.maxPitchAngle)
            this.pitchAngle = -this.maxPitchAngle;
        this.horSpeed -= this.acceleration; 
    } 
    else {
        if (this.pitchAngle < 0)
            this.pitchAngle += deltaT / 20;
        if (this.pitchAngle > 0)
            this.pitchAngle -= deltaT / 20;
    }

    if (this.movingUp) {
        this.verSpeed += this.acceleration;
    } 
    
    if (this.movingDown) {
        this.verSpeed -= this.acceleration;
    } 
    
    if (this.rotatingLeft) {
        this.rotationSpeed += this.rotationAcceleration;
    } 
    
    if (this.rotatingRight) {
        this.rotationSpeed -= this.rotationAcceleration;
    } 
    
	//limites das velocidades
	if (this.horSpeed > this.maxSpeed)
    	this.horSpeed = this.maxSpeed;
    if (this.horSpeed < (this.maxSpeed * -1))
    	this.horSpeed = this.maxSpeed * -1;

    if (this.verSpeed > this.maxSpeed)
    	this.verSpeed = this.maxSpeed;
    if (this.verSpeed < (this.maxSpeed * -1))
    	this.verSpeed = this.maxSpeed * -1;

    if (this.rotationSpeed > this.maxRotSpeed)
    	this.rotationSpeed = this.maxRotSpeed;
    if (this.rotationSpeed < (this.maxRotSpeed * -1))
    	this.rotationSpeed = this.maxRotSpeed * -1;
    
	//tratamento das desacelerações
    if (this.horDeceleration){
    	if (this.horSpeed > 0)
    		this.horSpeed -= this.acceleration;
    	if (this.horSpeed < 0)
    		this.horSpeed += this.acceleration;
    	if (this.horSpeed < this.acceleration && this.horSpeed > -this.acceleration){
    		this.horDeceleration = false;
    		this.horSpeed = 0;
    	}
    }
    
    if (this.verDeceleration){
    	if (this.verSpeed > 0)
    		this.verSpeed -= this.acceleration;
    	if (this.verSpeed < 0)
    		this.verSpeed += this.acceleration;
    	if (this.verSpeed < this.acceleration && this.verSpeed > -this.acceleration){
    		this.verDeceleration = false;
    		this.verSpeed = 0;
    	}
    }

    if (this.rotDeceleration){
    	if (this.rotationSpeed > 0)
    		this.rotationSpeed -= this.rotationAcceleration;
    	if (this.rotationSpeed < 0)
    		this.rotationSpeed += this.rotationAcceleration;
    	if (this.rotationSpeed < this.rotationAcceleration && this.rotationSpeed > -this.rotationAcceleration){
    		this.rotDeceleration = false;
    		this.rotationSpeed = 0;
    	}
    }

    this.propellerFront.update(t);
    this.propellerRear.update(t);
    this.propellerSides.update(t);

    this.cable.update(t);
};

MyDrone.prototype.getHookPosition = function() {
    return {
        "x": this.posX,
        "y": this.posY - this.cable.cableLength,
        "z": this.posZ,
        "alpha": this.facingAngle
    };
};