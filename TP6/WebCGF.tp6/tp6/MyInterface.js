 MyInterface.Keys =
 {
 	LEFT : 65,		//a
 	RIGHT : 68,		//d
 	FORWARD : 87,	//w
 	BACK : 83,		//s
 	UP : 73,		//i
 	DOWN : 74		//j
 };


 /**
 * MyInterface
 * @constructor
 */
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'changeClockAnimation');	

	// add a group of controls (and open/expand by defult)
	

	var groupLights=this.gui.addFolder("Luzes");
	groupLights.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	groupLights.add(this.scene, 'LIGHT_0');
	groupLights.add(this.scene, 'LIGHT_1');
	groupLights.add(this.scene, 'LIGHT_2');
	groupLights.add(this.scene, 'LIGHT_3');
	groupLights.add(this.scene, 'LIGHT_4');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyDown
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) {
	
	switch (event.which || event.keyCode)
	{
		case (MyInterface.Keys.LEFT):
			this.scene.drone.move('left');
			break;
		case (MyInterface.Keys.RIGHT):
			this.scene.drone.move('right');
			break;
		case (MyInterface.Keys.FORWARD):
			this.scene.drone.move('forward');
			break;
		case (MyInterface.Keys.BACK):
			this.scene.drone.move('back');
			break;
		case (MyInterface.Keys.UP):
			this.scene.drone.move('up');
			break;
		case (MyInterface.Keys.DOWN):
			this.scene.drone.move('down');
			break;
	};
};

/**
 * processKeyUp
 * @param event {Event}
 */
MyInterface.prototype.processKeyUp = function(event) {
	
	switch (event.which || event.keyCode)
	{
		case (MyInterface.Keys.LEFT):
			this.scene.drone.stop('left');
			break;
		case (MyInterface.Keys.RIGHT):
			this.scene.drone.stop('right');
			break;
		case (MyInterface.Keys.FORWARD):
			this.scene.drone.stop('forward');
			break;
		case (MyInterface.Keys.BACK):
			this.scene.drone.stop('back');
			break;
		case (MyInterface.Keys.UP):
			this.scene.drone.stop('up');
			break;
		case (MyInterface.Keys.DOWN):
			this.scene.drone.stop('down');
			break;
	};
};