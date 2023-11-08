import { OrthographicCamera, Sphere } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRouter } from "next/router"
import { useRef } from "react"
import { MathUtils, Mesh, Vector3 } from "three"
import { TIMEOUT, useFont } from "../styles/FontProvider"

const ROTATION_SPEED = 0.015
const MOVE_SPEED = 0.02
const TRANSITION_SPEED = 0.05

const Content = () => {
  const { pathname } = useRouter()
  const sphereRef = useRef<Mesh>(null)
  const { displayFont: font } = useFont()

  const main = pathname === "/"

  useFrame(({ camera, clock }) => {
    if (main) {
      camera.zoom = MathUtils.lerp(camera.zoom, 54, TRANSITION_SPEED)
      camera.position.lerp(new Vector3(0, -30, 0), TRANSITION_SPEED)
      camera.rotation.x = MathUtils.lerp(
        camera.rotation.x,
        Math.PI / 2,
        TRANSITION_SPEED
      )
      camera.rotation.y = MathUtils.lerp(camera.rotation.y, 0, TRANSITION_SPEED)
      camera.rotation.z = MathUtils.lerp(
        camera.rotation.z,
        clock.getElapsedTime() * ROTATION_SPEED,
        MOVE_SPEED
      )
      sphereRef.current.position.lerp(
        new Vector3(0, 0, 0),
        TRANSITION_SPEED + 0.02
      )
    } else {
      camera.zoom = MathUtils.lerp(camera.zoom, 20, TRANSITION_SPEED)
      camera.position.lerp(new Vector3(2, -4, 3), TRANSITION_SPEED)
      camera.rotation.x = MathUtils.lerp(
        camera.rotation.x,
        (Math.PI % clock.getElapsedTime()) * ROTATION_SPEED,
        MOVE_SPEED
      )
      camera.rotation.y = MathUtils.lerp(
        camera.rotation.y,
        clock.getElapsedTime() * ROTATION_SPEED,
        MOVE_SPEED
      )
      camera.rotation.z = MathUtils.lerp(
        camera.rotation.z,
        clock.getElapsedTime() * ROTATION_SPEED,
        MOVE_SPEED
      )
      sphereRef.current.position.lerp(new Vector3(-40, 0, 0), MOVE_SPEED)
    }
    camera.updateProjectionMatrix()
  })

  const numberOfShapes = font === "monospace" ? 2 : font === "sans" ? 12 : 24

  return (
    <>
      <OrthographicCamera makeDefault zoom={6} />
      <Sphere args={[4, numberOfShapes, numberOfShapes]} ref={sphereRef}>
        <meshPhongMaterial
          color="#bbb"
          opacity={main ? 1 : 0.3}
          wireframe
          transparent
        />
      </Sphere>
      <Sphere args={[120, numberOfShapes, numberOfShapes]}>
        <meshPhongMaterial color="#bbb" wireframe transparent />
      </Sphere>
      {/* <gridHelper args={[100, 100, 100]} /> */}
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[0, 6, 0]} />
    </>
  )
}

export default function Spheres() {
  const { displayFont, font } = useFont()
  return (
    <Canvas
      shadows
      style={{
        position: "absolute",
        transition: `opacity ${TIMEOUT}ms ease-in-out`,
        opacity: displayFont === font ? 1 : 0,
      }}
    >
      <Content />
    </Canvas>
  )
}
