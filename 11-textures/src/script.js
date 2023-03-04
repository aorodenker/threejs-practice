import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//TEXTURES

//loading manager for tracking multiple loading
const loadingManager = new THREE.LoadingManager();

//loading manager has built in methods to track things:
loadingManager.onStart = () => {
    console.log('start');
};

loadingManager.onProgress = () => {
    console.log('progress');
};

loadingManager.onLoad = () => {
    console.log('loaded');
};

loadingManager.onError = () => {
    console.log('error');
};

//create texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);
//.load(texture, optional 3 callbacks: loaded, progress, error) texture
const colorTexture = textureLoader.load('/textures/minecraft.png');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

//messing with textures
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

colorTexture.offset.x = 0.5;
colorTexture.offset.y = 0.5;

//rotate texture
colorTexture.rotation = Math.PI / 4;
//change center of texture to middle
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

//adjust minification/magnification filters to change texture quality if necessary
//THREE.NearestFilter has better performance than the other filters
//can turn off mipmapping if using min/mag for better performance
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

//image characteristics:
//weight - .jpg: lossy compression but lighter, .png: lossless compression but heavier. Can compress (ex: TinyPNG/Basis)
//size - each pixel of the texture has to be stored regardless of weight, height and width must be power of 2 for mipmapping
//data - .jpg: no alpha, .png: can combine color and alpha. Might be less load to use color version and alpha version
//if using normal texture, use .png because we need exact values

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
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

//TEXTURES

//color - color
//alpha - grayscale image, white visible, black not
//height (displacement) - grayscale, move vertices up or down, needs enough subdivision
//normal - add details, doesnt need subdivision, fakes height, better performance than height
//ambient occlusion - fake shadows on crevices, not physically accurate
//metalness - mostly used for reflection, black is non-metallic, white is metallic
//roughness - works with metalness, white rough, black smooth, mostly for light dissipation
//etc
//all use PBR
//PBR - Physically Based Rendering - becoming the standard for realistic rendering