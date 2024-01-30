import {
    glMatrix,
    mat2, mat2d, mat3, mat4,
    quat, quat2,
    vec2, vec3, vec4,} from './toji-gl-matrix-v3.3.0-62-g8962b2e/src/index.js';
import { str } from './toji-gl-matrix-v3.3.0-62-g8962b2e/src/mat2.js';
import { initBuffers  } from "./initBuffers.js";
import { GlCall } from "./glErrors.js";

let cubeRotation = 0.0;

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {Object} programInfo 
 * @param {Object} buffers 
 * @param {WebGLTexture} texture
 */
function drawScene(gl, programInfo, buffers, texture, cubeRotation) {
    GlCall(gl, () => gl.clearColor(0.0, 0.0, 0.0, 1.0), new Error());
    GlCall(gl, () => gl.clearDepth(1.0), new Error());
    GlCall(gl, () => gl.enable(gl.DEPTH_TEST), new Error());
    GlCall(gl, () => gl.depthFunc(gl.LEQUAL), new Error());

    GlCall(gl, () => gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT), new Error());

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(
        projectionMatrix,
        fieldOfView, 
        aspect,
        zNear,
        zFar
    );

    const modelViewMatrix = mat4.create();

    mat4.translate(
        modelViewMatrix,
        modelViewMatrix,
        [-0.0, 0.0, -6.0]
    );
    
    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        cubeRotation,
        [0, 0, 1]
    );

    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        cubeRotation * .7,
        [0, 1, 0]
    );

    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        cubeRotation * 0.3,
        [1, 0, 0]
    );

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    
    // set vertex position
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;

        GlCall(gl, () => gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position), new Error());

        GlCall(gl, () => gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset
        ), new Error());
        GlCall(gl, () => gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition), new Error());
    }
    
    //set texture coord
    {
        const num = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        GlCall(gl, () => gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord), new Error());
        GlCall(gl, () => gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset), new Error());
        GlCall(gl, () => gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord), new Error());
    }
    
    
    GlCall(gl, () => gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices), new Error());
    
    setNormalAttribute(gl, buffers, programInfo);

    GlCall(gl, () => gl.useProgram(programInfo.program), new Error());

    
    GlCall(gl, () => gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    ), new Error());

    GlCall(gl, () => gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    ), new Error());

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix
    );

        
    GlCall(gl, () => gl.activeTexture(gl.TEXTURE0), new Error());
    GlCall(gl, () => gl.bindTexture(gl.TEXTURE_2D, texture), new Error());
    GlCall(gl, () => gl.uniform1i(programInfo.uniformLocations.uSampler, 0), new Error());

    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        GlCall(gl, () => gl.drawElements(gl.TRIANGLES, vertexCount, type, offset), new Error());
    }
}

function setNormalAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    GlCall(gl, () => gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals), new Error());
    GlCall(gl, () => gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset
    ), new Error());
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
}

export {
    drawScene
};