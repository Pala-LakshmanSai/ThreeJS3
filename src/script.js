import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene

const clock = new THREE.Clock();
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = clock.getDelta();
  cubeMesh.rotation.x += THREE.MathUtils.degToRad(1) * delta;

  const sineValue = Math.sin(currentTime) + 1;
  cubeMesh.scale.x = sineValue * 5;

  cubeMesh.position.x += 0.01 * delta
  // cubeMesh.scale.x += 0.01 * delta;

  
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
