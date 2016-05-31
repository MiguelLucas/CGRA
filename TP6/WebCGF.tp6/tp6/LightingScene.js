var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    
    this.LIGHT_0 = true;
    this.LIGHT_1 = true;
    this.LIGHT_2 = true;
    this.LIGHT_3 = true;
    this.LIGHT_4 = true;
    
    this.clockAnimation = true;
    
    this.speed = 1;
    this.currDroneAppearance = 0;
    
    this.droneAppearance = "Space";
    
    this.enableTextures(true);
    
    this.initCameras();
    
    this.initLights();
    
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
    this.axis = new CGFaxis(this);
    
    // Scene elements
    this.table = new MyTable(this);
    this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
    this.floor = new MyQuad(this,0,10,0,12);
    
    this.boardA = new Plane(this,BOARD_A_DIVISIONS);
    this.boardB = new Plane(this,BOARD_B_DIVISIONS);
    
    this.lamp = new MySemisphere(this,16,20);
    this.cylinder = new MyCylinder(this,8,20,true,true);
    
    this.clock = new MyClock(this);
    
    this.drone = new MyDrone(this);    
    this.cargo = new MyCargo(this);
    this.dropspot = new MyDropSpot(this);
    
    // Materials
    this.materialDefault = new CGFappearance(this);
    
    this.materialA = new CGFappearance(this);
    this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialA.setSpecular(0, 0.2, 0.8, 1);
    this.materialA.setShininess(120);
    
    this.materialB = new CGFappearance(this);
    this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialB.setShininess(120);
    
    this.materialWall = new CGFappearance(this);
    this.materialWall.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialWall.setDiffuse(0.99, 0.90, 0.79, 1);
    this.materialWall.setSpecular(0.2, 0.2, 0.2, 1);
    this.materialWall.setShininess(10);
    
    //textures
    
    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.loadTexture("../resources/images/floor.png");
    
    this.windowAppearance = new CGFappearance(this);
    this.windowAppearance.loadTexture("../resources/images/window.png");
    this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    
    this.slidesAppearance = new CGFappearance(this);
    this.slidesAppearance.loadTexture("../resources/images/slides.png");
    this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.slidesAppearance.setShininess(30);
    
    this.boardAppearance = new CGFappearance(this);
    this.boardAppearance.loadTexture("../resources/images/board.png");
    this.boardAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
    this.boardAppearance.setSpecular(0.9, 0.9, 0.9, 1);
    this.boardAppearance.setShininess(120);
    this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    
    this.columnAppearance = new CGFappearance(this);
    this.columnAppearance.loadTexture("../resources/images/pillar.jpg");
    this.columnAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    
    this.lampAppearance = new CGFappearance(this);
    this.lampAppearance.loadTexture("../resources/images/lamp.png");
    this.lampAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

    this.targetAppearance = new CGFappearance(this);
    this.targetAppearance.loadTexture("../resources/images/target.png");
    this.targetAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    
    //colors    
    this.lightBlue = new CGFappearance(this);
    this.lightBlue.setAmbient(0.3, 0.3, 0.3, 1);
    this.lightBlue.setDiffuse(0 / 255, 255 / 255, 255 / 255, 1);
    this.lightBlue.setSpecular(0.5, 0.5, 0.5, 1);
    this.lightBlue.setShininess(120);
    
    this.orange = new CGFappearance(this);
    this.orange.setAmbient(0.3, 0.3, 0.3, 1);
    this.orange.setDiffuse(255 / 255, 142 / 255, 0 / 255, 1);
    this.orange.setSpecular(0.5, 0.5, 0.5, 1);
    this.orange.setShininess(120);
    
    this.red = new CGFappearance(this);
    this.red.setAmbient(0.3, 0.3, 0.3, 1);
    this.red.setDiffuse(255 / 255, 43 / 255, 43 / 255, 1);
    this.red.setSpecular(0.5, 0.5, 0.5, 1);
    this.red.setShininess(120);
    
    this.silver = new CGFappearance(this);
    this.silver.setAmbient(0.3, 0.3, 0.3, 1);
    this.silver.setDiffuse(192 / 255, 192 / 255, 192 / 255, 1);
    this.silver.setSpecular(0.5, 0.5, 0.5, 1);
    this.silver.setShininess(120);
    
    //appearances    
    this.metalAppearance = new CGFappearance(this);
    this.metalAppearance.loadTexture("../resources/images/metal.jpg");
    this.metalAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.metalAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    
    this.metalAppearance2 = new CGFappearance(this);
    this.metalAppearance2.loadTexture("../resources/images/metal2.jpg");
    this.metalAppearance2.setSpecular(0.7, 0.7, 0.7, 1);
    this.metalAppearance2.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    
    this.spaceAppearance = new CGFappearance(this);
    this.spaceAppearance.loadTexture("../resources/images/space.png");
    this.spaceAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.spaceAppearance.setShininess(120);
    
    this.dogeAppearance = new CGFappearance(this);
    this.dogeAppearance.loadTexture("../resources/images/doge.jpg");
    this.dogeAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.dogeAppearance.setShininess(120);
    
    this.tronAppearance = new CGFappearance(this);
    this.tronAppearance.loadTexture("../resources/images/tron.jpg");
    this.tronAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.tronAppearance.setShininess(120);
    
    this.angryAppearance = new CGFappearance(this);
    this.angryAppearance = this.silver;
    this.angryAppearance.loadTexture("../resources/images/angry.jpg");
    this.angryAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.angryAppearance.setShininess(120);
    
    this.kaleiAppearance = new CGFappearance(this);
    this.kaleiAppearance.loadTexture("../resources/images/kalei.jpg");
    this.kaleiAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.kaleiAppearance.setShininess(120);
    
    this.machineAppearance = new CGFappearance(this);
    this.machineAppearance.loadTexture("../resources/images/machine.jpg");
    this.machineAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.machineAppearance.setShininess(120);
    
    this.rustAppearance = new CGFappearance(this);
    this.rustAppearance.loadTexture("../resources/images/rust.jpg");
    this.rustAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.rustAppearance.setShininess(120);
    
    //mapping drone appearances    
    this.droneBodyAppearance = [];
    this.droneLongitudalArmAppearance = [];
    this.droneTransversalArmAppearance = [];
    this.droneBaseAppearance = [];
    this.droneFootAppearance = [];
    this.dronePropellerCenterAppearance = [];
    this.dronePropellerBladesAppearance = [];
    
    this.droneBodyAppearance[0] = this.spaceAppearance;
    this.droneLongitudalArmAppearance[0] = this.machineAppearance;
    this.droneTransversalArmAppearance[0] = this.machineAppearance;
    this.droneBaseAppearance[0] = this.machineAppearance;
    this.droneFootAppearance[0] = this.metalAppearance2;
    this.dronePropellerCenterAppearance[0] = this.metalAppearance2;
    this.dronePropellerBladesAppearance[0] = this.metalAppearance;
    
    this.droneBodyAppearance[1] = this.kaleiAppearance;
    this.droneLongitudalArmAppearance[1] = this.rustAppearance;
    this.droneTransversalArmAppearance[1] = this.rustAppearance;
    this.droneBaseAppearance[1] = this.kaleiAppearance;
    this.droneFootAppearance[1] = this.rustAppearance;
    this.dronePropellerCenterAppearance[1] = this.rustAppearance;
    this.dronePropellerBladesAppearance[1] = this.metalAppearance;
    
    this.droneBodyAppearance[2] = this.tronAppearance;
    this.droneLongitudalArmAppearance[2] = this.tronAppearance;
    this.droneTransversalArmAppearance[2] = this.tronAppearance;
    this.droneBaseAppearance[2] = this.tronAppearance;
    this.droneFootAppearance[2] = this.tronAppearance;
    this.dronePropellerCenterAppearance[2] = this.tronAppearance;
    this.dronePropellerBladesAppearance[2] = this.metalAppearance;
    
    this.droneBodyAppearance[3] = this.angryAppearance;
    this.droneLongitudalArmAppearance[3] = this.red;
    this.droneTransversalArmAppearance[3] = this.red;
    this.droneBaseAppearance[3] = this.red;
    this.droneFootAppearance[3] = this.orange;
    this.dronePropellerCenterAppearance[3] = this.orange;
    this.dronePropellerBladesAppearance[3] = this.metalAppearance;
    
    this.droneBodyAppearance[4] = this.dogeAppearance;
    this.droneLongitudalArmAppearance[4] = this.silver;
    this.droneTransversalArmAppearance[4] = this.silver;
    this.droneBaseAppearance[4] = this.orange;
    this.droneFootAppearance[4] = this.silver;
    this.dronePropellerCenterAppearance[4] = this.lightBlue;
    this.dronePropellerBladesAppearance[4] = this.metalAppearance;
    
    this.droneAppearanceList = ['Space', 'Rusty', 'Tron', 'Face', 'Doge'];    
    
    this.setUpdatePeriod(1000 / 60);
};

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0, 0, 0, 0);
    
    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true);
    // show marker on light position (different from enabled)
    
    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true);
    // show marker on light position (different from enabled)
    
    this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    this.lights[2].setVisible(true);
    
    this.lights[3].setPosition(4, 6, 5, 1);
    this.lights[3].setVisible(true);
    
    this.lights[4].setPosition(0, 5, 8, 1);
    this.lights[4].setVisible(true);
    
   
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1, 1, 0, 1);
    
    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    
    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1, 1, 1, 1);
    this.lights[2].setConstantAttenuation(0.0);
    this.lights[2].setLinearAttenuation(1);
    this.lights[2].setQuadraticAttenuation(0.0);

    
    this.lights[3].setAmbient(0, 0, 0, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setSpecular(1, 1, 0, 1);
    this.lights[3].setConstantAttenuation(0.0);
    this.lights[3].setLinearAttenuation(0.0);
    this.lights[3].setQuadraticAttenuation(1);
    
    this.lights[4].setAmbient(0, 0, 0, 1);
    this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[4].setSpecular(0, 0, 0, 0);
};

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
};

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup
    
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();
    
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    
    // Update all lights used
    this.updateLights();
    
    // Draw axis
    this.axis.display();
    
    //this.materialDefault.apply();
    
    // ---- END Background, camera and axis setup
    
    
    // ---- BEGIN Geometric transformation section
    
    // ---- END Geometric transformation section
    
    
    // ---- BEGIN Primitive drawing section
    
    // Floor
    this.pushMatrix();
    this.translate(7.5, 0, 7.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(15, 15, 0.2);
    this.floorAppearance.apply();
    this.floor.display();
    this.popMatrix();
    
    // Lamp
    this.pushMatrix();
    this.translate(8, 8, 8);
    this.rotate(90 * degToRad, 1, 0, 0);
    this.scale(1, 1, 1);
    this.lampAppearance.apply();
    this.lamp.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.translate(6, 3.6, 8);
    this.rotate(-90 * degToRad, 1, 0, 0);
    //this.cylinder.display();
    this.popMatrix();
    
    // Left Wall
    this.pushMatrix();
    this.translate(0, 4, 7.5);
    this.rotate(90 * degToRad, 0, 1, 0);
    this.scale(15, 8, 0.2);
    //this.materialWall.apply();
    this.windowAppearance.apply();
    this.wall.display();
    this.popMatrix();
    
    // Plane Wall
    this.pushMatrix();
    this.translate(7.5, 4, 0);
    this.scale(15, 8, 0.2);
    this.materialWall.apply();
    this.wall.display();
    this.popMatrix();
    
    // First Table
    this.pushMatrix();
    this.translate(5, 0, 8);
    this.table.display();
    this.popMatrix();
    
    // Second Table
    this.pushMatrix();
    this.translate(12, 0, 8);
    this.table.display();
    this.popMatrix();
    
    // Board A
    this.pushMatrix();
    this.translate(4, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
    this.slidesAppearance.apply();
    //this.materialA.apply();
    this.boardA.display();
    this.popMatrix();
    
    // Board B
    this.pushMatrix();
    this.translate(10.5, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
    //this.slidesAppearance.apply();
    this.boardAppearance.apply();
    //this.materialB.apply();
    this.boardB.display();
    this.popMatrix();
    
    // Column
    this.pushMatrix();
    this.scale(1, 8, 1);
    this.translate(2, 0, 14);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.columnAppearance.apply();
    this.cylinder.display();
    this.popMatrix();
    
    // Clock
    this.pushMatrix();
    this.translate(7.2, 7, 0);
    this.clock.display();
    this.popMatrix();
    
    // Drone
    this.drone.display();
    
    // Cargo
    this.cargo.display();

    // Drop spot
    this.dropspot.display();    
    

    //GUI Lights    
    if (this.LIGHT_0)
        this.lights[0].enable();
    else
        this.lights[0].disable();
    
    if (this.LIGHT_1)
        this.lights[1].enable();
    else
        this.lights[1].disable();
    
    if (this.LIGHT_2)
        this.lights[2].enable();
    else
        this.lights[2].disable();
    
    if (this.LIGHT_3)
        this.lights[3].enable();
    else
        this.lights[3].disable();
    
    if (this.LIGHT_4)
        this.lights[4].enable();
    else
        this.lights[4].disable();
    
    //GUI Appearance choice    
    switch (this.droneAppearance) {
    case "Space":
        this.currDroneAppearance = 0;
        break;
    case "Rusty":
        this.currDroneAppearance = 1;
        break;
    case "Tron":
        this.currDroneAppearance = 2;
        break;
    case "Face":
        this.currDroneAppearance = 3;
        break;
    case "Doge":
        this.currDroneAppearance = 4;
        break;
    }
};

LightingScene.prototype.update = function(currTime)
{
    if (this.clockAnimation)
        this.clock.update(currTime);
    this.drone.update(currTime);    

    //update da carga
    if (!this.cargo.delivered)
    {
        var cargoPos = this.cargo.getPosition();
        var hookPos = this.drone.getHookPosition();

        if (!this.cargo.picked)
        {
            //se ainda não foi apanhada a carga verifica se a posição do gancho coincide com a da caixa
            if (hookPos.x > cargoPos.xMin && hookPos.x < cargoPos.xMax && 
            hookPos.y > cargoPos.yMin && hookPos.y < cargoPos.yMax && 
            hookPos.z > cargoPos.zMin && hookPos.z < cargoPos.zMax)
                this.cargo.picked = true;
        }
        else{
            var dropspotPos = this.dropspot.getPosition();

            //se foi apanhada a carga verifica se a posição da caixa coincide com a do destino 
            if ( Math.abs(dropspotPos.y - cargoPos.y) < 0.1 &&
            Math.sqrt( Math.pow(dropspotPos.x-cargoPos.x, 2) + Math.pow(dropspotPos.z-cargoPos.z, 2) ) < dropspotPos.radious )
            {
                this.cargo.delivered = true;
                this.cargo.drop(dropspotPos);
            }
            //caso contrario move a caixa com o gancho 
            else
                this.cargo.update(hookPos);
        }
    }
};

LightingScene.prototype.changeClockAnimation = function() {
    
    if (this.clockAnimation)
        this.clockAnimation = false;
    else
        this.clockAnimation = true;
};