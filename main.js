import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//Loading normalMap
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/NormalMap.png');

// Setup Scene
const scene = new THREE.Scene();

// Setup Camera (PerspectiveCamera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setup Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Set size (whole window)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Defining Torus Shape geometry
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );

// Create advanced type of material with texture and more options
const material = new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.5, roughness:0.2, normalMap: normalTexture });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Appling Light effects on object

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Draw the random stars on full screen every time the screen is refreshed
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('/textures/coding-space.jpg');
scene.background = spaceTexture;

// Add texture
const splTexture = new THREE.TextureLoader().load('/textures/SPL-logo.PNG');

// Create material with texture
const spl = new THREE.Mesh(new THREE.BoxGeometry(7, 7, 7), new THREE.MeshBasicMaterial({ map: splTexture }));

scene.add(spl);

spl.position.z = -5;
spl.position.x = 2;

// Draw the scene every time the screen is refreshed
function animate() {
  requestAnimationFrame(animate);

  // Rotate objects (Change values to change speed)
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  spl.rotation.x += 0.002;
  spl.rotation.y += 0.005;

  renderer.render(scene, camera);
}

// Function to make page responssive
function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}
// Calling EventListener
window.addEventListener('resize', onWindowResize, false);

animate();
