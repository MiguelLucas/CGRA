function MyDroneLeg(scene, slices) {
	CGFobject.call(this,scene);

	this.slices = slices;

	this.initBuffers();
};

MyDroneLeg.prototype = Object.create(CGFobject.prototype);
MyDroneLeg.prototype.constructor=MyDroneLeg;

MyDroneLeg.prototype.initBuffers = function () {
	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];
 	
 	var xCoord = 0;
 	var yCoord = 0 ;
	var xIncrement = 1 / this.slices;
 	var yIncrement = 1;
	var alpha=Math.PI/this.slices;

	for(i = 0; i <= 2; i++) {
		for(j = 0; j < this.slices; j++) {
			this.vertices.push(Math.cos(alpha*j),Math.sin(alpha*j),i * 0.1);
			this.normals.push(Math.cos(alpha*j),Math.sin(alpha*j),0);
			this.texCoords.push(xCoord, yCoord);
			xCoord += xIncrement;
		}
		xCoord =0;
		yCoord += yIncrement;
	}
		
	for(i = 0; i < 2; i++) {
		for(j = 0; j < this.slices - 1; j++) {
			this.indices.push(i*this.slices + j, i*this.slices + j+1, (i+1)*this.slices + j);
			this.indices.push(i*this.slices + j+1, (i+1)*this.slices + j+1, (i+1)*this.slices + j);

			this.indices.push(i*this.slices + j+1, i*this.slices + j, (i+1)*this.slices + j);
			this.indices.push((i+1)*this.slices + j+1, i*this.slices + j+1, (i+1)*this.slices + j);
		}
	}


		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};