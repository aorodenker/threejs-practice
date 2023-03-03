//scene
const scene = new THREE.Scene();

//red cube
//geometry - box takes 3 params - width, height, depth
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

//add cube to scene
scene.add(mesh);

//sizes
const sizes = {
  width: 800,
  height: 600
 };

//camera (perscpective) params - FoV, aspect ratio, near, far clipping plane (distance to be rendered)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
//position camera. z = in/out, x = left/right, y = up/down
camera.position.z = 3

//add camera to scene
scene.add(camera);

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
