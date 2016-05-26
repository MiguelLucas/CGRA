/**
 * MyForm
 * @constructor
 */
 function MyForm(scene, slices, stacks, minS, maxS, minT, maxT) {
 	CGFobject.call(this,scene);

 	this.minS = minS || 0;
 	this.maxS = maxS || 1;
 	this.minT = minT || 0;
 	this.maxT = maxT || 1;

 	this.slices = slices;
 	console.log("slice: "+this.slices);
 	this.stacks = stacks;
 	console.log("stacks: "+stacks.slices);

// --------------------------------------------------------------------------------

	this.angleDivision=360/slices;
	this.angle = 0;

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

// --------------------------------------------------------------------------------

 	this.initBuffers();
 };

 MyForm.prototype = Object.create(CGFobject.prototype);
 MyForm.prototype.constructor = MyForm;

 MyForm.prototype.initBuffers = function() {

 	var x;
	var y;
	var z;

	var aux;

	var auxX;
	var auxY;
 	
    this.vertices.push(0);              //x=0
    this.vertices.push(0);              //y=0
    this.vertices.push(this.stacks);

    this.normals.push(0);
    this.normals.push(0);
    this.normals.push(1);

	this.texCoords.push(0.5, 0.5);

 	for(var i=0; i<this.slices; i++){

 		x=Math.cos(this.angle*degToRad);
 		//console.log("x: "+x);
		y=Math.sin(this.angle*degToRad);
		//console.log("y: "+y);
		z=this.stacks;
		//console.log("z: "+z);

		this.vertices.push(x);
        this.vertices.push(y);
        this.vertices.push(z);

        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

		//console.log("======================================================================");

		auxX = 0.5 + x/2;
		//console.log("auxX: "+auxX);
		auxY = 0.5 - y/2;
		//console.log("auxY: "+auxY);

        this.texCoords.push(auxX,auxY);

		this.angle = this.angle + this.angleDivision;
 	}

    for(var j=1; j<=this.slices; j++){

		//console.log("======================================================================");
        this.indices.push(0);
       // console.log("ponto: "+0);
        this.indices.push(j);
		//console.log("ponto: "+j);
        if(j==this.slices) {
        	this.indices.push(1);
        	//console.log("ponto: "+1);
        	//console.log("FIM");
        }
        else{
        	aux = j + 1;
        	this.indices.push(aux);
        	//console.log("ponto: "+aux);
        }  
 	}

   /* this.texCoords = [
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.minS, this.minT,
    this.maxS, this.minT
    ];*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };