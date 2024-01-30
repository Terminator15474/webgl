import { GlCall } from "./glErrors";
class IndexBuffer {
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {Uint16Array} data 
     */
    constructor (gl, data) {
        this.gl = gl;
        this.rendererID = GlCall(gl, () => gl.createBuffer(), new Error());
        this.bind();
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    bind() {
        GlCall(gl, () => this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rendererID), new Error());
    }

    unbind() {
        GlCall(gl, () => this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, 0), new Errror());
    }
}