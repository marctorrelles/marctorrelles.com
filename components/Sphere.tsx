import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"

function MyRotatingBox() {
  const myMesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    myMesh.current.rotation.x = a * 0.4
    myMesh.current.rotation.y = a * 0.2
  })

  return (
    <mesh ref={myMesh}>
      <octahedronGeometry />
      <meshNormalMaterial color="royalblue" />
    </mesh>
  )
}

export default function SphereComponent() {
  return (
    <Canvas style={{ position: "absolute" }}>
      <ambientLight intensity={0.1} />
      <directionalLight />
      <MyRotatingBox />
    </Canvas>
  )
}
