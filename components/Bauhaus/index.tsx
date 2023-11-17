import { OrthographicCamera, Sphere } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { SP } from "next/dist/shared/lib/utils"
import { useMemo, useRef } from "react"
import THREE, { MathUtils, Mesh, MeshPhysicalMaterial, Vector3 } from "three"

const SPHERE_SEPARATION = 8

function Spheres() {
  const orangeSphere = useRef<Mesh>()
  const redSphere = useRef<Mesh>()
  const greenSphere = useRef<Mesh>()
  const blueSphere = useRef<Mesh>()

  useFrame(({ camera, scene }) => {
    if (
      !orangeSphere.current ||
      !redSphere.current ||
      !greenSphere.current ||
      !blueSphere.current
    ) {
      return
    }

    orangeSphere.current.position.y = MathUtils.damp(
      orangeSphere.current.position.y,
      SPHERE_SEPARATION,
      0.5,
      0.05
    )
    redSphere.current.position.y = MathUtils.damp(
      redSphere.current.position.y,
      -SPHERE_SEPARATION,
      0.5,
      0.05
    )
    greenSphere.current.position.x = MathUtils.damp(
      greenSphere.current.position.x,
      SPHERE_SEPARATION,
      0.5,
      0.05
    )
    blueSphere.current.position.x = MathUtils.damp(
      blueSphere.current.position.x,
      -SPHERE_SEPARATION,
      0.5,
      0.05
    )

    camera.zoom = MathUtils.lerp(camera.zoom, 30, 0.01)
    // camera.rotateZ(0.001)
    // camera.position.lerp(new Vector3(10, 0, 100), 0.001)
    // scene.position.lerp(new Vector3(10, 0, 0), 0.05)
    // // scene.position.lerp(new Vector3(100, 0, 50), 0.05)
    // camera.position.lerp(new Vector3(0, 0, 120), 0.05)
    // camera.zoom = MathUtils.lerp(camera.zoom, 10, 0.05)
    // scene.position.z = MathUtils.damp(scene.position.z, 50, 0.5, 0.05)
    // scene.position.lerp([10, 0, 50], 0.05)

    camera.updateProjectionMatrix()
    scene.updateMatrixWorld()
  })

  return (
    <>
      <OrthographicCamera makeDefault zoom={10} position={[0, 0, 100]} />
      <ambientLight />
      {/* <pointLight position={[0, 0, 10]} /> */}
      <Sphere
        ref={orangeSphere}
        args={[10, 64, 64]}
        position={[0, 0, SPHERE_SEPARATION]}
      >
        <meshPhysicalMaterial color="#f58240" transparent opacity={0.8} />
      </Sphere>
      <Sphere
        ref={redSphere}
        args={[10, 64, 64]}
        position={[0, 0, -SPHERE_SEPARATION]}
      >
        <meshPhysicalMaterial color="#fa2a2a" transparent opacity={0.7} />
      </Sphere>
      <Sphere
        ref={greenSphere}
        args={[10, 64, 64]}
        position={[0, 0, SPHERE_SEPARATION * 2]}
      >
        <meshPhysicalMaterial color="#2afa2a" transparent opacity={0.5} />
      </Sphere>
      <Sphere
        ref={blueSphere}
        args={[10, 64, 64]}
        position={[0, 0, -SPHERE_SEPARATION * 2]}
      >
        <meshPhysicalMaterial color="#2a2afa" transparent opacity={0.7} />
      </Sphere>
    </>
  )
}

export default function Bauhaus() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Spheres />
    </Canvas>
  )
}
