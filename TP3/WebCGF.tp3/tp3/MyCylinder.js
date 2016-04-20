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

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
