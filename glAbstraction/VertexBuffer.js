import { GlCall } from "../scripts/glErrors";

class VertexBuffer {
    /**
     * 
     * @param {WebGlRenderingContext} gl 
     * @param {Float32Array} data
     */
    constructor(gl, data) {
        this.gl = gl;
        this.rendererID = GlCall(gl, () => gl.createBuffer(), new Error());
        this.bind();
        GlCall(gl, () => gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW), new Error());
    }

    bind() {
        GlCall(gl, () => this.gl.bindBuffer(gl.ARRAY_BUFFER, this.rendererID), new Error());
    }
    
    unbind() {
        GlCall(gl, () => this.gl.bindBuffer(gl.ARRAY_BUFFER, 0), new Error());
    }
}