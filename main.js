import "./style.css"

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const earthLight = new THREE.PointLight(0xffffff, 4, 10, 0);
earthLight.position.set(4, 0, -2);
scene.add(earthLight);

const moonLight = new THREE.PointLight(0xffffff, 4, 10, 0);
moonLight.position.set(-2, 0, 33);
scene.add(moonLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.05;
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(moonLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg');
spaceTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./assets/moon_normal.jpg');

const earthTexture = new THREE.TextureLoader().load('./assets/earth.jpg');
const earthNormal = new THREE.TextureLoader().load('./assets/earth_normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.x = 3;
earth.position.y = 0;
earth.position.z = -8;
earth.rotation.x = 0.5;
scene.add(earth);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64, ),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);


scene.add(moon);
moon.position.x = -10;
moon.position.y = 0;
moon.position.z = 30;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}

function animate() {
    requestAnimationFrame(animate);

    moon.rotation.x += 0.01;
    earth.rotation.y += 0.005;
    moveCamera();

    renderer.render(scene, camera);
}

animate();
moveCamera();
