import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);


// ANIMATIONS

//OPTION 1: handle different framerates using Date.now()

//create time variable to normalize different framerate computers
let time = Date.now();

//function called on each frame
const tick = () => {

    //store current time
    const currentTime = Date.now();
    //store difference between time and current time
    const deltaTime = currentTime - time;
    //update time to current time
    time = currentTime;

    //rotate each frame using delta
    mesh.rotation.y += 0.001 * deltaTime;

    //render
    renderer.render(scene, camera);

    //requestAnimationFrame() purpose is to call the function provided on the next frame
    window.requestAnimationFrame(tick);
};

tick();

//OPTION 2: handle different framerates using THREE.Clock() - DO NOT use getDelta();

//create clock
const clock = new THREE.Clock();

//function called on each frame
const tick = () => {

    //clock.getElapsedTime() - track elapsed time from clock
    const elapsedTime = clock.getElapsedTime();

    //rotate each frame using elapsedTime (elapsedTime * Math.PI * 2) = one rotation per second
    // mesh.rotation.y = elapsedTime * Math.PI * 2;

    //Math.sin(num) = up/down starting at 0
    camera.position.y = Math.sin(elapsedTime);
    //Math.cos(num) = up/down starting at 1
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(mesh.position);

    //render
    renderer.render(scene, camera);

    //requestAnimationFrame() purpose is to call the function provided on the next frame
    window.requestAnimationFrame(tick);
};

tick();

//OPTION 3: gsap has built in normalization

//gsap.to(vector3, object{duration, delay, axis, etc})
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
