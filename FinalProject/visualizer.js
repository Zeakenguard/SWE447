//Basic scene setup
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 5;

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
var pointLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointLight)

//Geometry setup
//
var bassCube = new THREE.BoxGeometry(1, 1, 1);
var midCube = new THREE.BoxGeometry(1, 1, 1);
var lowCube = new THREE.BoxGeometry(1, 1, 1);

var material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xff0000,
    emissiveIntensity: 0.25
});

var mesh1 = new THREE.Mesh(bassCube, material);
var mesh2 = new THREE.Mesh(midCube, material);
var mesh3 = new THREE.Mesh(lowCube, material);

mesh1.position.set(-5, 0, -5);
mesh2.position.set(0, 0, -5);
mesh3.position.set(5, 0, -5);

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);

//Audio setup
//
var listener = new THREE.AudioListener();
camera.add(listener);

var song = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load('Bee Gees - Night Fever (Serban Mix).mp3', function (buffer) {
    song.setBuffer(buffer);
    song.setLoop(true);
    song.setVolume(0.5);
    song.play();
});

//Audio analyser setup
//
var analyser = new THREE.AudioAnalyser(song, 32);

var frequencyData = analyser.data;

var render = function () {
    analyser.getFrequencyData();

    mesh1.scale.x = frequencyData[0] / 100;
    mesh1.scale.y = frequencyData[0] / 100;
    mesh1.scale.z = frequencyData[0] / 100;
    mesh1.rotation.x += 0.01;
    mesh1.rotation.y += 0.01;

    mesh2.scale.x = frequencyData[8] / 100;
    mesh2.scale.y = frequencyData[8] / 100;
    mesh2.scale.z = frequencyData[8] / 100;
    mesh2.rotation.x += 0.01;
    mesh2.rotation.y += 0.01;

    mesh3.scale.x = frequencyData[15] / 100;
    mesh3.scale.y = frequencyData[15] / 100;
    mesh3.scale.z = frequencyData[15] / 100;
    mesh3.rotation.x += 0.01;
    mesh3.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
    console.log(frequencyData)
}

render();
