/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
function GlClearError(gl) {
    while(gl.getError() != gl.NO_ERROR) {}
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
function GlPrintError(gl) {
    let error;
    while ((error = gl.getError()) != gl.NO_ERROR) {
        console.error(error);
    }
}

/**
 * 
 * @param {WebGLRenderingContext} gl
 * @param {Function} callback 
 */
function GlCall(gl, callback) {
    GlClearError(gl);
    let ret = callback();
    GlPrintError(gl);
    return ret;
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @returns 
 */
function initBuffers(gl) {
    const positionBuffer = initPositionBuffer(gl);
    
    const textureCoordBuffer = initTextureCoordBuffer(gl);
    
    const indexBuffer = initIndexBuffer(gl);

    const normalBuffer = initNormalBuffer(gl);

    return {
        position: positionBuffer,
        normals: normalBuffer,
        textureCoord: textureCoordBuffer,
        indices: indexBuffer,
    };
}

function initPositionBuffer(gl) {
    // Create a buffer for the square's positions.
    const positionBuffer = GlCall(gl, () => gl.createBuffer());
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    GlCall(gl, () => gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer));
  
    // Now create an array of positions for the square.
  
    const positions = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
      
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
      
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
      
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
      
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
      ];
      
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    GlCall(gl, () => gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(positions),
                  gl.STATIC_DRAW));
    return positionBuffer;
}

function initIndexBuffer(gl) {
    const indexBuffer = GlCall(gl, () => gl.createBuffer());
    GlCall(gl, () => gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer));

    const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ];
   
    GlCall(gl, () => gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW));
    return indexBuffer;
}

function initTextureCoordBuffer(gl) {
    
    const textureCoordBuffer = GlCall(gl, () => gl.createBuffer());
    GlCall(gl, () => gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer));
    const textureCoordinates = [
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Back
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
    ];

    GlCall(gl, () => gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoordinates), /// FUCK TEXTURE COORD BUFFER
        gl.STATIC_DRAW
    ));
    
    return textureCoordBuffer;
}

function initNormalBuffer(gl) {
    const normalBuffer = GlCall(gl, () => gl.createBuffer());
    GlCall(gl, () => gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer));

    const vertexNormals = [
        // Front
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

        // Back
        0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

        // Top
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

        // Bottom
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

        // Right
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

        // Left
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
  ];

    GlCall(gl, () =>
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertexNormals),
        gl.STATIC_DRAW
    ));

    return normalBuffer;
}

export {
    initBuffers
};