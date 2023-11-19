import {
  Box,
  Circle,
  Octahedron,
  OrthographicCamera,
  Sphere,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"
import { useFont } from "../../styles/FontProvider"
import { useCustomFrame } from "./useCustomFrame"
import { styled } from "styled-components"

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.7;
  @media (prefers-color-scheme: dark) {
    opacity: 1;
  }
`

const colors = {
  orangeMesh: "#f5a440",
  redMesh: "#fa2a2a",
  greenMesh: "#2afa2a",
  blueMesh: "#2ab1fa",
} as const

function Spheres() {
  const orangeMesh = useRef<Mesh>()
  const redMesh = useRef<Mesh>()
  const greenMesh = useRef<Mesh>()
  const blueMesh = useRef<Mesh>()
  const refs = { orangeMesh, redMesh, greenMesh, blueMesh }

  useCustomFrame(refs)

  const { displayFont } = useFont()

  const { Component, args } = (() => {
    switch (displayFont) {
      case "monospace": {
        return { Component: Box, args: [20, 20, 20] }
      }
      case "sans": {
        return { Component: Octahedron, args: [10, 1, 1] }
      }
      case "serif": {
        return { Component: Circle, args: [10, 128, 128] }
      }
    }
  })() as {
    Component: typeof Sphere | typeof Circle | typeof Box
    args: [number, number, number] | [number, number, number]
  }

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 100]} />
      <ambientLight />
      <pointLight position={[0, 0, 20]} />
      {Object.entries(refs).map(([key, ref], index) => {
        const position = [0, 0, index * 20] as const
        return (
          <Component ref={ref} args={args} scale={0} position={position}>
            <meshPhysicalMaterial
              color={colors[key]}
              transparent
              opacity={0.6}
            />
          </Component>
        )
      })}
    </>
  )
}

export default function Bauhaus() {
  return (
    <Container>
      <Canvas flat linear>
        <Spheres />
      </Canvas>
    </Container>
  )
}
