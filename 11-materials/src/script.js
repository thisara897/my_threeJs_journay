import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture  = textureLoader.load('./textures/door/door/AmbientOcclusionTexture .jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * MeshBasicMaterial
 */
// const material = new THREE.MeshBasicMaterial()
// // material.map = doorColorTexture
// // material.color = new THREE.Color(0xff0000)
// // material.wireframe = true
// // material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

/**
 * MeshNormalMaterial
 */
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

/**
 * MeshMatcapMaterial
 */

const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 20, 20),
    material
    //new THREE.MeshBasicMaterial({color : 0x00ff00})
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
    //new THREE.MeshBasicMaterial({color : 0x0000ff})
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
    //new THREE.MeshBasicMaterial({color : 0xff0000})
)

sphere.position.x = -1.5
plane.position.x = -0
torus.position.x = 1.5

// scene.add(sphere)
// scene.add(plane)
// scene.add(torus)

scene.add(sphere, plane, torus)


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
camera.position.z = 2
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

    //animate objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x= 0.15 * elapsedTime
    torus.rotation.x= 0.15 * elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()