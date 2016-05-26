/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

 	var alpha = 2*Math.PI/this.slices;

    //Circle Center
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);

	for(i = 0; i < this.slices; i++)
	{
		this.vertices.push(0.5*Math.cos(alpha*i));
 		this.vertices.push(0.5*Math.sin(alpha*i));
 		this.vertices.push(0);

		this.normals.push(0, 0, 1);

		this.texCoords.push(0.5*Math.cos(alpha*i) + 0.5)
		this.texCoords.push(0.5 - 0.5*Math.sin(alpha*i));

        if(i == this.slices -1)
        {
            this.indices.push(i + 1);
            this.indices.push(1);
            this.indices.push(0);
        }
        else
        {
            this.indices.push(i + 1);
            this.indices.push(i + 2);
            this.indices.push(0);
        }
	} 	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
