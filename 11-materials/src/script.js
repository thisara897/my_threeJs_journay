import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import GUI from 'lil-gui'

const gui = new GUI()

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture =textureLoader.load('./textures/door/ambientOcclusion.jpg')
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

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

/** 
 * MeshDepthMaterial
*/

// const material = new THREE.MeshDepthMaterial()

/**
 * MeshLambertMaterial
 */

// const material = new THREE.MeshLambertMaterial()

/**
 * MeshPhongMaterial
 */

// const material = new THREE.MeshPhongMaterial()

/**
 * MeshToonMaterial
 */

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

/**
 * Environment map
 */

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * MeshStandardMaterial
 */
// const material = new THREE.MeshStandardMaterial()
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.metalnessMap = doorMetalnessTexture
// material.roughness = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// // material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.displacementScale = 0.1
// material.metalness = 1
// material.roughness = 1
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

/**
 * MeshPhysicalMaterial
 */
const material = new THREE.MeshPhysicalMaterial()

material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.metalnessMap = doorMetalnessTexture
material.roughness = doorRoughnessTexture
material.metalness = 1
material.roughness = 1
material.normalMap = doorNormalTexture
material.normalScale.set(0.5,0.5)
material.transparent = true
material.alphaMap = doorAlphaTexture
material.displacementScale = 0.1
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
//clearCoat
material.clearcoat = 1
material.clearcoatRoughness = 0

gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

//sheen
material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)
gui.add(material, 'sheen').min(0).max(1).step(0.0001)
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
    //new THREE.MeshBasicMaterial({color : 0x00ff00})
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1,100, 100),
    material
    //new THREE.MeshBasicMaterial({color : 0x0000ff})
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
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
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff,1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.z = 3
pointLight.position.x = 4
scene.add(pointLight)

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