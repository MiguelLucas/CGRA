/**
 * MySemisphere
 * @constructor
 */
 function MySemisphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySemisphere.prototype = Object.create(CGFobject.prototype);
 MySemisphere.prototype.constructor = MySemisphere;

 MySemisphere.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

 	var alpha = 2*Math.PI/this.slices;

 	for(j = 0; j <= this.stacks; j++)
	{
 		if(j < this.stacks)
 		{
 			for(i = 0; i < this.slices; i++)
 			{
 				this.vertices.push(0.5*Math.cos(alpha*i)*Math.cos(Math.asin(j/this.stacks)));
	 			this.vertices.push(0.5*Math.sin(alpha*i)*Math.cos(Math.asin(j/this.stacks)));
	 			this.vertices.push(0.5*j/this.stacks);

	 			this.normals.push( Math.cos(alpha*i)*Math.cos(Math.asin(j/this.stacks)) );
	 			this.normals.push( Math.sin(alpha*i)*Math.cos(Math.asin(j/this.stacks)) );
				this.normals.push(j/this.stacks);

				this.texCoords.push(i/this.slices, j/this.stacks);

				if(j < this.stacks-1)
				{
					if (i == this.slices - 1)
					{
						this.indices.push(0 + i + this.slices*j);
						this.indices.push(1 + i + this.slices*(j-1));
						this.indices.push(1 + i + this.slices*(j));

						this.indices.push(1 + i + this.slices*(j));
						this.indices.push(0 + i + this.slices*(j+1));
						this.indices.push(0 + i + this.slices*j);
					}
					else
					{
						this.indices.push(0 + i + this.slices*j);
						this.indices.push(1 + i + this.slices*j);
						this.indices.push(1 + i + this.slices*(j+1));

						this.indices.push(1 + i + this.slices*(j+1));
						this.indices.push(0 + i + this.slices*(j+1));
						this.indices.push(0 + i + this.slices*j);
					}
				}
 			} 			
 		}
 		else
 		{
 			this.vertices.push(0);
	 		this.vertices.push(0);
	 		this.vertices.push(0.5);

	 		this.normals.push(0);
	 		this.normals.push(0);
			this.normals.push(1);

			this.texCoords.push(1, 1);

	 		for(i = 0; i < this.slices-1; i++)
 			{
 				this.indices.push(0 + i + this.slices*(j-1));
				this.indices.push(1 + i + this.slices*(j-1));
				this.indices.push(this.slices*this.stacks);
 			}
 			this.indices.push(this.slices*j-1);
			this.indices.push(this.slices*(j-1));
			this.indices.push(this.slices*this.stacks);
 		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
