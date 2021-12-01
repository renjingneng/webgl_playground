function loadShader(gl, shaderSource, shaderType) {
    const errFn =  console.error;
    // Create the shader object
    const shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        const lastError = gl.getShaderInfoLog(shader);
        errFn(lastError);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(gl, shaders) {
    const errFn = console.error;
    const program = gl.createProgram();
    shaders.forEach(function (shader) {
        gl.attachShader(program, shader);
    });
    gl.linkProgram(program);

    // Check the link status
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        const lastError = gl.getProgramInfoLog(program);
        errFn(lastError);
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

function createShaderFromScript(gl, scriptId) {
    let shaderSource = "";
    let shaderType;
    const shaderScript = document.getElementById(scriptId);
    if (!shaderScript) {
        throw ("*** Error: unknown script element" + scriptId);
    }
    shaderSource = shaderScript.text;

    if (shaderScript.type === "x-shader/x-vertex") {
        shaderType = gl.VERTEX_SHADER;
    } else if (shaderScript.type === "x-shader/x-fragment") {
        shaderType = gl.FRAGMENT_SHADER;
    } else if (shaderType !== gl.VERTEX_SHADER && shaderType !== gl.FRAGMENT_SHADER) {
        throw ("*** Error: unknown shader type");
    }

    return loadShader(
        gl, shaderSource, shaderType);
}

function createProgramFromScripts(gl, shaderScriptIds) {
    var shaders = [];
    shaders.push(createShaderFromScript(gl, shaderScriptIds[0]));
    shaders.push(createShaderFromScript(gl, shaderScriptIds[1]));
    return createProgram(gl, shaders);
}

function createProgramFromSources( gl, shaderSources) {
    var shaders = [];
    shaders.push(loadShader(gl, shaderSources[0], gl.VERTEX_SHADER));
    shaders.push(loadShader(gl, shaderSources[1], gl.FRAGMENT_SHADER));
    return createProgram(gl, shaders);
}

function resizeCanvasToDisplaySize(canvas) {
    if (canvas.width !== canvas.clientWidth  ||  canvas.height !== canvas.clientHeight) {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      return true;
    }
    return false;
  }
export { createProgram, createProgramFromScripts, createProgramFromSources,resizeCanvasToDisplaySize };