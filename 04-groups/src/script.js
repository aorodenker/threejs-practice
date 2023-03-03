import * as THREE from 'three';

const scene = new THREE.Scene();

const canvas = document.querySelector('.webgl');

//group objects so they rotate, scale, position together
const group = new THREE.Group();
group.position.set(0, 1, 0);
group.scale.y = 2;
group.rotation.y = 1;

//add group to scene
scene.add(group);

//THREE.Mesh(geometry, material) geometry and material can be created in one function
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

//add object to group
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

//position object inside group before adding to group
cube2.position.set(-2, 0, 0);

group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

cube3.position.set(2, 0, 0);

group.add(cube3);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600
 };

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);