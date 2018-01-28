var gl = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.80, 0.60, 0.30, 0.50 );

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
