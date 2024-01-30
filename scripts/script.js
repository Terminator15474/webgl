import { initBuffers  } from "./initBuffers.js";
import { drawScene } from "./drawScene.js";
import { GlCall } from "./glErrors.js";
import { loadTexture, updateTexture } from "./loadTexture.js";
import { initShaderProgram } from "./shaders.js";
import { setupVideo, copyVideo } from "./loadVideo.js";

let deltaTime = 0.0;
let cubeRotation = 0.0;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext("webgl");
/** 
 * @type {spector}
 */
/*
var spector = new SPECTOR.Spector();
console.log(spector);

spector.displayUI();
console.log(spector.spyCanvases());
*/
// Vertex shader program

if(gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShaderSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;
        // Apply lighting effect
        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
    }`;

const fragmentShaderSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
        highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
        gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }`;

const shaderProgram = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: GlCall(gl, () => gl.getAttribLocation(shaderProgram, 'aVertexPosition'), new Error()),
        vertexNormal:  GlCall(gl, () => gl.getAttribLocation(shaderProgram, 'aVertexNormal'), new Error()),
        textureCoord:   GlCall(gl, () => gl.getAttribLocation(shaderProgram, 'aTextureCoord'), new Error()),
    },
    uniformLocations: {
        projectionMatrix: GlCall(gl, () => gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'), new Error()),
        modelViewMatrix:  GlCall(gl, () => gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'), new Error()),
        normalMatrix:     GlCall(gl, () => gl.getUniformLocation(shaderProgram, 'uNormalMatrix'), new Error()),
        uSampler: GlCall(gl, () => gl.getUniformLocation(shaderProgram, 'uSampler'), new Error()),
    },
};

const buffers = initBuffers(gl);

/**
 * @type {WebGLTexture}
 */
const texture = loadTexture(gl);
const video = setupVideo("./firefox.mp4");

GlCall(gl, () => gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true), new Error());

let then = 0;

function render(now) {
    now *= 0.001;
    deltaTime = now - then;
    then = now;

    if ( copyVideo ) {
        updateTexture(gl, texture, video);
    }
    
    drawScene(gl, programInfo, buffers, texture, cubeRotation);
    cubeRotation += deltaTime;

    requestAnimationFrame(render);
}
requestAnimationFrame(render);