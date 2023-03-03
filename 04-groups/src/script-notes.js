import * as THREE from 'three';

//scene
const scene = new THREE.Scene();

//red cube
//geometry - box takes 3 params - width, height, depth
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

//add cube to scene
scene.add(mesh);

//.position .z = in/out, .x = left/right, .y = up/down
//.set(x,y,z)
mesh.position.set(0.7, -0.6, 1);

//.scale = stretch object
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z= 0.5
//OR
mesh.scale.set(2, 0.5, 0.5);

//rotation: Euler - x=rotate left/right,  y=rotate towards/away, z=spin
//OR
//quaternion (updating one updates the other) mathematical rotation
//pi = 180 degrees
//pi*2 = 360
//pi/2 = 90
//pi/4 = 45
//.reorder(uppercase string of axis order) specifies order of rotation axis
mesh.rotation.reorder('YXZ');
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;

//GIMBAL LOCK = improper rotation order, causes unexpected axis rotation
//example: fps - character must rotate left/right(y) before up/down(x)

//AxesHelper(length of each line) = visualize axes to help with positioning - red=x green=y blue=z
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//.length() = vector3 = distance between center of scene and object position
// console.log('distance from center to cube', mesh.position.length())

//sizes
const sizes = {
  width: 800,
  height: 600
 };

//camera (perscpective) params - FoV, aspect ratio, near, far clipping plane (distance to be rendered)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3
//add camera to scene
scene.add(camera);

//.lookAt(vector3) - rotates object so its -z faces target vector3
camera.lookAt(mesh.position);

//.distanceTo(vector3) = vector3 = distance from another vector3 or object
// console.log('distance from cube to camera', mesh.position.distanceTo(camera.position))

//normalize takes vector3 length and reduce it to 1
// mesh.position.normalize(camera.position);

//grab canvas from DOM
const canvas = document.querySelector('.webgl');

//create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

//resize renderer, also resizes canvas. setSize params - width, height
renderer.setSize(sizes.width, sizes.height);

//render params - scene, camera
renderer.render(scene, camera);

//objects have 4 properties: position, scale, rotation, quaternion
