const DEBUG = false;

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
 * @param {Error} err
 */
function GlPrintError(gl, err) {
    let error;
    while ((error = gl.getError()) != gl.NO_ERROR) {
        console.error( "[" + err.lineNumber + "]: " + error);
    }
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {Function} callback 
 * @param {Error} error
 */
function GlCall(gl, callback, error) {
    if (!DEBUG) return callback(); 
    GlClearError(gl);
    let ret = callback();
    GlPrintError(gl, error);
    return ret;
}

export {
    GlCall
};