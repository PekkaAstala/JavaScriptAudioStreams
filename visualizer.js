class Visualizer {

    constructor(canvas) {
        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!this.gl) {
          return;
        }

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.initShaders();
    }

    initShaders() {
        var vertexShaderSource =  " \
            attribute vec4 a_position; \
            void main() { \
                gl_Position = a_position; \
            } \
        ";
        var fragmentShaderSource = " \
            precision mediump float; \
            void main() { \
                gl_FragColor = vec4(1, 0, 0.5, 1); \
            } \
        ";
        var vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this.createProgram(vertexShader, fragmentShader);
        this.gl.useProgram(this.program);
    }

    draw(data) {
        var positionAttributeLocation =this.gl.getAttribLocation(this.program, "a_position");
        var positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        let positions = this.calculateVertices(data);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions),this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.viewport(0, 0,this.gl.canvas.width,this.gl.canvas.height);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, positions.length / 2);
    }

    calculateVertices(data) {
        let coords = [];

        data.forEach((datapoint, count) => {
            if (count > 0) {
                return; // just first range for now
            }

            coords.push(0); coords.push(0); // origo
            coords.push(-0.5); coords.push(datapoint.value / 300);
            coords.push(0.5); coords.push(datapoint.value / 300);
        });

        return coords;
    }

    createShader(type, source) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
    }

    createProgram(vertexShader, fragmentShader) {
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            return program;
        }
    }

}
