import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';


/**
 * Debug
*/
const gui = new GUI()

/**
 * Texture
*/
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColortexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphatexture = textureLoader.load('textures/door/alpha.jpg')
const doorAmbientOcclusiontexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const doorHeighttexture = textureLoader.load('textures/door/height.jpg')
const doorNormaltexture = textureLoader.load('textures/door/normal.jpg')
const doorMetalnesstexture = textureLoader.load('textures/door/metalness.jpg')
const doorRoughnesstexture = textureLoader.load('textures/door/roughness.jpg')
const matcaptexture = textureLoader.load('textures/matcaps/8.png')
const gradienttexture = textureLoader.load('textures/gradients/3.jpg')
gradienttexture.minFilter = THREE.NearestFilter
gradienttexture.magFilter = THREE.NearestFilter
gradienttexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/3/px.jpg',
    '/textures/environmentMaps/3/nx.jpg',
    '/textures/environmentMaps/3/py.jpg',
    '/textures/environmentMaps/3/ny.jpg',
    '/textures/environmentMaps/3/pz.jpg',
    '/textures/environmentMaps/3/nz.jpg'
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColortexture
// // material.color.set('red')
// material.wireframe = true
// material.transparent = true
// // material.opacity = 0.5
// material.alphaMap = doorAlphatexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcaptexture

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000
// material.specular = new THREE.Color(0x0000ff)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradienttexture

// const material = new THREE.MeshStandardMaterial
// material.metalness = 0
// material.roughness = 1
// material.map = doorColortexture
// material.aoMap = doorAmbientOcclusiontexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeighttexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnesstexture
// material.roughnessMap = doorRoughnesstexture
// material.normalMap = doorNormaltexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphatexture

const material = new THREE.MeshStandardMaterial
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture


gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(1).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)



const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
sphere.position.x = -1.5



const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))



const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.16, 64, 128),
    material
)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.x = 1.5

scene.add(sphere, plane, torus)



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0 * elapsedTime
    torus.rotation.y = 0.2 * elapsedTime

    sphere.rotation.x = 0.1 * elapsedTime
    plane.rotation.z = 0.12 * elapsedTime
    torus.rotation.x = -0.25 * elapsedTime



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()