import './style.css'
import * as THREE from 'three';

//Scene
const scene = new THREE.Scene()

//Red Cube
const geometry = new THREE.BoxGeometry(3, 3, 3)
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 0, 10);
scene.add(light);

//Sizes
const sizes = {
    width: 800,
    height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width, sizes.height)
camera.position.z = 10
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer( {
    canvas: canvas
} )
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)