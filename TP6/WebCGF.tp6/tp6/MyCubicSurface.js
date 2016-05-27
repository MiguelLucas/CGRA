/**
 * MyCubicSurface
 * @constructor
 */
function MyCubicSurface(scene, P2x, P2y, P3x, P3y, P4x, P4y) {
    CGFobject.call(this, scene);
    
    this.P2x = P2x;
    this.P2y = P2y;
    this.P3x = P3x;
    this.P3y = P3y;
    this.P4x = P4x;
    this.P4y = P4y;
    
    this.initBuffers();
}
;

MyCubicSurface.prototype = Object.create(CGFobject.prototype);
MyCubicSurface.prototype.constructor = MyQuad;

MyCubicSurface.prototype.initBuffers = function() {
    
    this.vertices = [];
    this.indices = [];
    //this.normals = [];
    this.texCoords = [];
    
    var v = [];
    var n = [];
    var t = [];
    
    Calteljau(0, 0, this.P2x, this.P2y, this.P3x, this.P3y, this.P4x, this.P4y, v, n, t, 0.5, 0.5);
    
    var P0 = [0,0,0];
    var P0z = [0,0,1];
    var P4 = [this.P4x, this.P4y, 0];
    var P4z = [this.P4x, this.P4y, 1];
    this.vertices = this.vertices.concat(P0, P0, P0z, P0z, v, P4, P4, P4z, P4z);

    var T0 = [0,1];
    var T0z = [1,1];
    var T4 = [0, 0];
    var T4z = [1, 0];
    this.texCoords = this.texCoords.concat(T0, T0z, T0z, T0, t, T4, T4z, T4z, T4);

    var size = this.vertices.length/12;
    for(i = 0; i < size - 1; i++)
    {
        this.indices.push(i*4, i*4+2, i*4+4);
        this.indices.push(i*4+2, i*4+6, i*4+4);
        this.indices.push(i*4+3, i*4+1, i*4+5);
        this.indices.push(i*4+3, i*4+5, i*4+7);
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    
    function Calteljau(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y, vertices, normals, texCoords, midTex, deltaLength) 
    {
        var l2x = (p1x + p2x) / 2;
        var l2y = (p1y + p2y) / 2;
        
        var hx = (p2x + p3x) / 2;
        var hy = (p2y + p3y) / 2;
        
        var l3x = (l2x + hx) / 2;
        var l3y = (l2y + hy) / 2;
        
        var r3x = (p3x + p4x) / 2;
        var r3y = (p3y + p4y) / 2;
        
        var r2x = (hx + r3x) / 2;
        var r2y = (hy + r3y) / 2;
        
        var l4x = (l3x + r2x) / 2;
        var l4y = (l3y + r2y) / 2;
        
        var r1x = l4x;
        var r1y = l4y;

        //verifica critério de paragem (inclinação e proximidade)
        iLeft = (hy - p1y) / (hx - p1x);
        iRight = (p4y - hy) / (p4x - hx);
        
        if ((iLeft / iRight < 1.1 && iLeft / iRight >= 0.9) || (Math.abs(p4x - p1x) < 0.1 && Math.abs(p4y - p1y) < 0.1)) 
        {
            return;
        }
        
        var verticesLeft = [];
        var normalsLeft = [];
        var texCoordsLeft =[];     
        Calteljau(p1x, p1y, l2x, l2y, l3x, l3y, l4x, l4y, verticesLeft, normalsLeft, texCoordsLeft, midTex+0.5*deltaLength, deltaLength/2);
        
        var verticesRight = [];
        var normalsRight = []; 
        var texCoordsRight =[];       
        Calteljau(r1x, r1y, r2x, r2y, r3x, r3y, p4x, p4y, verticesRight, normalsRight, texCoordsRight, midTex-0.5*deltaLength, deltaLength/2);
        
        //vertices
        var v0 = [l4x, l4y, 0];
        var v1 = [l4x, l4y, 1];
        vertices.push.apply(vertices, verticesLeft.concat(v0, v0, v1, v1, verticesRight));

        //texCoords
        var t0 = [0, midTex];
        var t1 = [1, midTex];
        texCoords.push.apply(texCoords, texCoordsLeft.concat(t0, t1, t1, t0, texCoordsRight));
                
        //calcula normais
        var n0 = [];
        var n1 = [];
        normals.push.apply(normals, normalsLeft.concat(n0, n1, n0, n1, normalsRight));
    }
}
;
