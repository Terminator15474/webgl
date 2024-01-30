import { GlCall } from "../scripts/glErrors";
class Shader {
    constructor(gl, vertexSource, fragmentSource) {
        this.gl = gl;
        this.rendererID = gl.createProgram();

        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

        GlCall(gl, () => gl.attachShader(this.rendererID, vertexShader), new Error());
        GlCall(gl, () => gl.attachShader(this.rendererID, fragmentShader), new Error());
        GlCall(gl, () => gl.linkProgram(this.rendererID), new Error());

        if (!GlCall(gl, () => gl.getProgramParameter(this.rendererID, gl.LINK_STATUS), new Error())) {
            alert(`Unable to initialize the shader program: ${GlCall(gl, () => gl.getProgramInfoLog(this.rendererID), new Error())}`);
            console.log(`Unable to initialize the shader program: ${GlCall(gl, () => gl.getProgramInfoLog(this.rendererID), new Error())}`);
        }

    }

    bind() {
        this.gl.useProgram(this.rendererID);
    }

    unbind() {
        this.gl.useProgram(0);
    }
}


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