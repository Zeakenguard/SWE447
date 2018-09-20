
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
		    0.0, 0.0, 0.0, //0
			1.0, 0.0, 0.0, //1
			1.0, 1.0, 0.0, //2
			0.0, 1.0, 0.0, //3
			
			0.0, 0.0, 1.0, //4
			1.0, 0.0, 1.0, //5
			1.0, 1.0, 1.0, //6
			0.0, 1.0, 1.0, //7
			
			0.0, 0.0, 0.0, //8
			1.0, 0.0, 0.0, //9
			1.0, 0.0, 1.0, //10
			0.0, 0.0, 1.0, //11
			
			0.0, 1.0, 0.0, //12
			1.0, 1.0, 0.0, //13
			1.0, 1.0, 1.0, //14
			0.0, 1.0, 1.0, //15
			
			0.0, 0.0, 1.0, //16
			0.0, 0.0, 0.0, //17
			0.0, 1.0, 0.0, //18
			0.0, 1.0, 1.0, //19
			
			1.0, 0.0, 1.0, //20
			1.0, 0.0, 0.0, //21
			1.0, 1.0, 0.0, //22
			1.0, 1.0, 1.0 //23
			
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
			0, 3, 2,
			2, 1, 0,
			
			4, 7, 6,
			6, 5, 4,
			
			8, 11, 10,
			10, 9, 8,
			
			12, 15, 14,
			14, 13, 12,
			
			16, 19, 18,
			18, 17, 16,

			20, 23, 22,
			22, 21, 20,
			
        ]),
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
