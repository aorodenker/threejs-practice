import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

//Float32Array(length || create in place) typed array meaning can only store floats, has fixed length, easier for computing
//use 9 for 3 vertices (triangle)
//each 3 indexes = 1 vertex representing x, y, z

//fill option 1:
const positionsArray = new Float32Array(9);

positionsArray[0] = 0;
positionsArray[1] = 0;
positionsArray[2] = 0;

positionsArray[3] = 0;
positionsArray[4] = 1;
positionsArray[5] = 0;

positionsArray[6] = 1;
positionsArray[7] = 0;
positionsArray[8] = 0;

//fill option 2:
const positionsArray = new Float32Array([
    0, 0, 0,
    0, 1, 0,
    1, 0, 0
]);

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true //wireframe shows triangles on object
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();

//GEOMETRY

//BoxGeometry() - cube
//PlaneGeometry() - flat square
//CircleGeometry() - flat circle
//ConeGeometry() - 3d cone
//CylinderGeometry() - 3d cylinder
//RingGeometry() - flat ring
//TorusGeometry() - 3d ring
//TorusKnotGeometry() - 3d knot?
//DecahedronGeometry() - 3d decahydron
//OctahedronGeometry() - 3d, 8 faces (starish)
//TetrahedronGeometry() - 3d triangle
//IcosahedronGeometry() - 3d rough ball
//SphereGeometry() - 3d sphere
//ShapeGeometry() - custom based on curves
//TubeGeometry() - hollow 3d tube
//ExtrudeGeometry() - 3d rounded cube?
//LatheGeometry() - 3d hollow cone (ex: wine glass top)
//TextGeometry() - 3d text