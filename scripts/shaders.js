import { GlCall } from "./glErrors.js";

function loadShader(gl, type, source) {
    const shader = GlCall(gl, () => gl.createShader(type), new Error());

    // Send the source to the shader object

    GlCall(gl, () => gl.shaderSource(shader, source), new Error());

    // Compile the shader program

    GlCall(gl, () => gl.compileShader(shader), new Error());

    // See if it compiled successfully

    if (!GlCall(gl, () => gl.getShaderParameter(shader, gl.COMPILE_STATUS), new Error())) {
        alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        GlCall(gl, () => gl.deleteShader(shader), new Error());
        return null;
    }

    return shader;
}


function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = GlCall(gl, () => gl.createProgram(), new Error());
    GlCall(gl, () => gl.attachShader(shaderProgram, vertexShader), new Error());
    GlCall(gl, () => gl.attachShader(shaderProgram, fragmentShader), new Error());
    GlCall(gl, () => gl.linkProgram(shaderProgram), new Error());

    // If creating the shader program failed, alert

    if (!GlCall(gl, () => gl.getProgramParameter(shaderProgram, gl.LINK_STATUS), new Error())) {
        alert(`Unable to initialize the shader program: ${GlCall(gl, () => gl.getProgramInfoLog(shaderProgram), new Error())}`);
        console.log(`Unable to initialize the shader program: ${GlCall(gl, () => gl.getProgramInfoLog(shaderProgram), new Error())}`);
        return null;
    }

    return shaderProgram;
}

export {
    initShaderProgram
};