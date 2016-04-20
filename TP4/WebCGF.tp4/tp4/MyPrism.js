/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

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
				this.normals.push(Math.cos(i*angle+angle/2));
				this.normals.push(Math.sin(i*angle+angle/2));
				this.normals.push(0);

				this.normals.push(Math.cos(i*angle+angle/2));
				this.normals.push(Math.sin(i*angle+angle/2));
				this.normals.push(1);
			}
		}
		Z+=1.0/this.stacks;

	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
