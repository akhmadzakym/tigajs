import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera,renderer.domElement);

// Torus (donat)
const geo1 = new THREE.TorusGeometry(10,3,16,100);
const mat1 = new THREE.MeshToonMaterial({color: 0x00ff00});
const torus = new THREE.Mesh(geo1,mat1);
scene.add(torus);

// Kubus
const geo2 = new THREE.BoxGeometry(5,5,5);
const mat2 = new THREE.MeshToonMaterial({color: 0xffff00});
const cube = new THREE.Mesh(geo2,mat2);
scene.add(cube);

// Stars
function star(){
    const geo3 = new THREE.BoxGeometry(0.25,0.25,0.25);
    const mat3 = new THREE.MeshBasicMaterial({color: 0xffffff});
    const bintang = new THREE.Mesh(geo3,mat3);

    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    bintang.position.set(x,y,z);
    scene.add(bintang);
}

Array(200).fill().forEach(star);

// Light Source
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight( color, intensity );
light.position.set(1,1,1);
scene.add( light );

camera.position.set(0,20,30);
controls.update();

function animate() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    controls.update();
    renderer.render( scene, camera );

}
