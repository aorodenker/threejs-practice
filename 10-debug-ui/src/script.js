import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'lil-gui';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
//add gui to page
const gui = new dat.GUI();


//add custom tweak
//variable to store rotation function
const params = {
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
    }
};

//add new function to gui
gui.add(params, 'spin')

//gui.add(object, property to manipulate, min, max, step, name: string to rename slider) to add a tweak
//OR
//gui.add(object, property to manipulate).min(num).max(num).step(num).name(string to rename slider)
gui.add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation');

//add visibility toggle
gui.add(mesh, 'visible')

//add wireframe toggle to material
gui.add(material, 'wireframe');

//add color slider to material
gui.addColor(material, 'color');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {

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

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();