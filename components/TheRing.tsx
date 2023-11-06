import { Sphere } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { styled } from "styled-components"
import { useLoading } from "../styles/LoadingProvider"

const MIN_RADIUS = 7.5
const MAX_RADIUS = 15
const DEPTH = 2
const NUM_POINTS = 3000

const randomFromInterval = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const pointsInner = Array.from(
  { length: NUM_POINTS },
  (v, k) => k + 1
).map((num) => {
  const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS)
  const randomAngle = Math.random() * Math.PI * 2

  const x = Math.cos(randomAngle) * randomRadius
  const y = Math.sin(randomAngle) * randomRadius
  const z = randomFromInterval(-DEPTH, DEPTH)

  return {
    idx: num,
    position: [x, y, z],
    color: "#666666",
  }
})

export const pointsOuter = Array.from(
  { length: NUM_POINTS / 5 },
  (v, k) => k + 1
).map((num) => {
  const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2)
  const angle = Math.random() * Math.PI * 2

  const x = Math.cos(angle) * randomRadius
  const y = Math.sin(angle) * randomRadius
  const z = randomFromInterval(-DEPTH * 12, DEPTH * 12)

  return {
    idx: num,
    position: [x, y, z],
    color: "#777777",
  }
})

const PointCircle = () => {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.03
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  )
}

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.05, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={5}
        color={color}
      />
    </Sphere>
  )
}

const StyledCanvas = styled(Canvas)`
  height: 100%;
  width: 100%;
  position: absolute !important;
  opacity: 1;
`

export default function TheRing() {
  const { setThreeLoaded } = useLoading()

  return (
    <StyledCanvas
      camera={{ position: [12, 20, 4] }}
      onCreated={() => setThreeLoaded(true)}
    >
      <directionalLight />
      <pointLight position={[0, 0, 30]} intensity={400.0} />
      <PointCircle />
    </StyledCanvas>
  )
}
