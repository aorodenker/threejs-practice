import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera

//do not use Camera class directly, other cameras inherit from it
//ArrayCamera - multiple different PoVs (ex: split screen)
//StereoCamera - two cameras to mimic eyes to create parallax effect (ex: VR headset, red/blue glasses)
//CubeCamera - 6 renders, each one facing a different direction - top/bottom/left/right/front/back (ex: environment maps, reflection)
//OrthographicCamera - no perspective, all objects same size regardless of distance
//PerspectiveCamera - uses perspective


//PERSPECTIVE CAMERA

//PerspectiveCamera(vertical fov-num, aspect ratio-num, near-num, far-num) near/far = render distance
//do not use extreme values for near/far to prevent z-fighting. ex: (0.0001, 9999999)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

//ORTHOGRAPHIC CAMERA

//use aspect ratio to set ortho camera size to canvas size to prevent distortion
const aspectRatio = sizes.width / sizes.height;

//OrthographicCamera(left, right, top, bottom, near, far) near/far = render distance
//do not use extreme values for near/far to prevent z-fighting. ex: (0.0001, 9999999)
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Animate

//camera movement with cursor

// Cursor

//store cursor current x, y
const cursor = {
  x: 0,
  y: 0
};
//event listener for mouse movement
window.addEventListener('mousemove', (event) => {
  //update cursor variable
  //current x / aspect width - 0.5 makes range -0.5 to 0.5 left/right
  //current y / aspect height - 0.5 makes range -0.5 to 0.5 top/bottom
  cursor.x = event.clientX / sizes.width - 0.5;
  //make y inverted for tracking below
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    // mesh.rotation.y = elapsedTime;

    //ex:
    //update camera on mouse movement, custom controls
    camera.position.x = cursor.x * 10;
    camera.position.y = cursor.y * 10;
    //camera always looks at cube
    camera.lookAt(mesh.position);

    //ex:
    //update camera on mouse movement, custom controls
    //math: makes one full rotation when moving mouse from max left to max right
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    //math: y only needs a multiplier of whatever works
    camera.position.y = cursor.y * 5;

    //replace above controls with three.js controls
    //controls are useful but have limitations
    //if it works, use it. if not, custom controls
    const controls = new OrbitControls(camera, canvas);

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();

//CONTROLS

//DeviceOrientationControls(camera) - IOS no longer supported - use device orientation to do things (ex: mobile phone movement)
//FlyControls(camera) - enable camera to rotate on all 3 axes, go forward, backward (ex: spaceship controls)
//FirstPersonControls(camera, DOM element) - similar to FlyControls but with fixed up axis
//PointerLockControls(camera, DOM element) - mouse disappear, camera follows mouse movement (ex: game movement)
//OrbitControls(camera, DOM element) - control camera PoV with mouse click + drags
//TrackballControls(camera, DOM element) - similar to OrbitControls but without vertical angle limit
//TransformControls(camera, DOM element) - doesnt manipulate camera, allows user to move things (ex: editor)
//DragControls(objects: array, camera, DOM element) - doesnt manipulate camera, user can move things, camera is fixed