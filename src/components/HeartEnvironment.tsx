import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const sourceShape = () => {
  const shape = new THREE.Shape()
  shape.moveTo(0, -1.15)
  shape.bezierCurveTo(-0.18, -0.82, -1.25, -0.25, -1.25, 0.48)
  shape.bezierCurveTo(-1.25, 1.28, -0.26, 1.46, 0, 0.72)
  shape.bezierCurveTo(0.26, 1.46, 1.25, 1.28, 1.25, 0.48)
  shape.bezierCurveTo(1.25, -0.25, 0.18, -0.82, 0, -1.15)
  return shape
}

export function HeartEnvironment() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 4.6)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const heart = new THREE.Group()
    heart.rotation.z = Math.PI
    const geometry = new THREE.ExtrudeGeometry(sourceShape(), {
      depth: 0.62,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.1,
      bevelThickness: 0.12,
      curveSegments: 32,
    })
    geometry.center()
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x86efac,
      emissive: 0x14532d,
      emissiveIntensity: 0.65,
      roughness: 0.22,
      metalness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    })
    heart.add(new THREE.Mesh(geometry, material))
    scene.add(heart)

    scene.add(new THREE.AmbientLight(0xdcfce7, 1.6))
    const keyLight = new THREE.PointLight(0x86efac, 9, 8)
    keyLight.position.set(2.5, 2.5, 4)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0x22c55e, 7, 7)
    fillLight.position.set(-3, -1, 2)
    scene.add(fillLight)

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    const clock = new THREE.Clock()
    let frame = 0
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      heart.rotation.y = Math.sin(elapsed * 0.32) * 0.28
      heart.rotation.x = Math.sin(elapsed * 0.22) * 0.08
      heart.position.y = Math.sin(elapsed * 0.8) * 0.08
      heart.scale.setScalar(1 + Math.max(0, Math.sin(elapsed * 2.2)) * 0.045)
      renderer.render(scene, camera)
      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="heart-environment" aria-hidden="true">
      <div ref={mountRef} className="heart-canvas" />
      <div className="heart-particles" />
    </div>
  )
}
