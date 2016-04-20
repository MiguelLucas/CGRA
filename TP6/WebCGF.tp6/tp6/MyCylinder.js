/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

	var angle = (2*Math.PI)/this.slices; // 2*PI/nSlices

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	
	var Z = 0;
	for(s = 0; s < this.stacks; s++){
		for(i = 0; i < this.slices; i++){
			this.vertices.push(Math.cos(i*angle));
			this.vertices.push(Math.sin(i*angle));
			this.vertices.push(Z);

			this.vertices.push(Math.cos((i+1)*angle));
			this.vertices.push(Math.sin((i+1)*angle));
			this.vertices.push(Z);

			this.vertices.push(Math.cos(i*angle));
			this.vertices.push(Math.sin(i*angle));
			this.vertices.push(Z+1);

			this.vertices.push(Math.cos((i+1)*angle));
			this.vertices.push(Math.sin((i+1)*angle));
			this.vertices.push(Z+1);

			this.indices.push(4*i+2);
			this.indices.push(4*i);
			this.indices.push(4*i+3);

			this.indices.push(4*i+1);
			this.indices.push(4*i+3);
			this.indices.push(4*i);

			for (k = 0; k < 2; k++){
				this.normals.push(Math.cos(i*angle));
				this.normals.push(Math.sin(i*angle));
				this.normals.push(0);

				this.normals.push(Math.cos(i*angle+angle));
				this.normals.push(Math.sin(i*angle+angle));
				this.normals.push(Z);
			}
		}
		Z+=1.0/this.stacks;

	}


	
	var x=0;
	var xIncrement=1/this.stacks;
	var y=0;
	var yIncrement=1/this.slices;

	var aux = 0;

	for(var i=0; i<this.stacks; i++) {
		for(var j=0; j<=this.slices; j++) {
			this.texCoords.push(x, y);
			this.texCoords.push(x+xIncrement, y);
			y = y + yIncrement;

			//aux = aux+2;
		}
		x = x + xIncrement;
		y = 0;
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
