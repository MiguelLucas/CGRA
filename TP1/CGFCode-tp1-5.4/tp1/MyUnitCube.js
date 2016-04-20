/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;



MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
             0.5, -0.5, -0.5,
             0.5, -0.5, 0.5,
             0.5, 0.5, -0.5,
             0.5, 0.5, 0.5
			];

//x = vermelho
//y = verde
//z = azul

	this.indices = [
			//face de tras
            0, 1, 2,
			3, 2, 1,
			//face da esquerda
			0, 4, 5,
			5, 1, 0,
			//face da direita
			2, 3, 6,
		    7, 6, 3, 
		    //face de cima
			5, 3, 1,
		    3, 5, 7,
		    //face da frente
		    4, 6, 7,
		    7, 5, 4,
		    //face de baixo
		    0, 2, 4,
		    6, 4, 2
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
