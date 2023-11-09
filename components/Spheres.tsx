import { CameraControls, Sphere, OrthographicCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRouter } from "next/router"
import { useRef } from "react"
import { Euler, MathUtils, Mesh, Vector3 } from "three"
import { TIMEOUT, useFont } from "../styles/FontProvider"

const TRANSITION_SPEED = 0.04
const ZOOM_SPEED = 0.03
const COLOR = "#bbbbbb"

type OtherSphereProps = {
  position: [number, number, number]
  size: number
  rotation: Euler
}

type SphereProps = OtherSphereProps & {
  zoom: number
  scenePosition: Vector3
  sceneRotation: [number, number, number]
}

type Spheres = {
  main: SphereProps
  about: SphereProps
  work: SphereProps
  posts: SphereProps
  photos: SphereProps
  center: SphereProps
}

const spheres: Spheres = {
  main: {
    position: [0, 0, 0],
    size: 180,
    rotation: new Euler(0, Math.PI / 2, Math.PI / 2),
    zoom: 1,
    // scenePosition: new Vector3(0, 0, -352),
    scenePosition: new Vector3(0, 0, 0),
    sceneRotation: [0, 0, 0],
  },
  about: {
    position: [0, 0, 0],
    size: 4,
    rotation: new Euler(0, Math.PI / 2, Math.PI / 2),
    zoom: 1.8,
    scenePosition: new Vector3(0, 0, -30),
    sceneRotation: [0, 0, 0],
  },
  work: {
    position: [35, 80, 0],
    size: 32,
    rotation: new Euler(0, Math.PI / 2, Math.PI / 2),
    zoom: 1.8,
    scenePosition: new Vector3(-50, -50, -60),
    sceneRotation: [-0.1, -0.8, -0.03],
  },
  posts: {
    position: [-100, 70, 0],
    size: 10,
    rotation: new Euler(0, Math.PI / 2, Math.PI / 2),
    zoom: 1.8,
    scenePosition: new Vector3(60, -70, 50),
    sceneRotation: [-0.1, -0.7, -0.07],
  },
  photos: {
    position: [-30, -80, -60],
    size: 31,
    rotation: new Euler(0, Math.PI / 2, Math.PI / 2),
    zoom: 1.8,
    scenePosition: new Vector3(70, -100, 40),
    sceneRotation: [-0.1, -0.8, -0.03],
  },
  center: {
    position: [80, 4, -10],
    size: 18,
    rotation: new Euler(0, Math.PI / 1 / 3, Math.PI / 5 / 2),
    zoom: 2,
    scenePosition: new Vector3(20, 70, -50),
    sceneRotation: [2, 0.2, 0.01],
  },
}

const otherSpheres: { [key: string]: OtherSphereProps } = {
  random1: {
    position: [-160, 20, 10],
    size: 7,
    rotation: new Euler(0, Math.PI / 2 / 8, (Math.PI / 2) * 3),
  },
  random2: {
    position: [-90, -100, -100],
    size: 10,
    rotation: new Euler(0, Math.PI / 2 / 10, Math.PI / 4),
  },
  random3: {
    position: [120, -60, 80],
    size: 18,
    rotation: new Euler(0, Math.PI, Math.PI / 3),
  },
  random4: {
    position: [-40, 140, 20],
    size: 14,
    rotation: new Euler(0, Math.PI, Math.PI / 3),
  },
}

function usePath() {
  const { pathname } = useRouter()

  if (pathname === "/") return "main"
  if (pathname.includes("about")) return "about"
  if (pathname.includes("posts")) return "posts"
  if (pathname.includes("work")) return "work"
  if (pathname.includes("photos")) return "photos"
  return "center"
}

const Content = () => {
  const { displayFont: font } = useFont()
  const path = usePath()

  useFrame(({ camera, scene }) => {
    const sphere = spheres[path]
    scene.position.lerp(sphere.scenePosition, TRANSITION_SPEED)
    camera.zoom = MathUtils.lerp(camera.zoom, 1.8, ZOOM_SPEED)
    // Rotate scene
    scene.rotation.x = MathUtils.lerp(
      scene.rotation.x,
      sphere.sceneRotation[0],
      ZOOM_SPEED
    )
    scene.rotation.y = MathUtils.lerp(
      scene.rotation.y,
      sphere.sceneRotation[1],
      ZOOM_SPEED
    )
    scene.rotation.z = MathUtils.lerp(
      scene.rotation.z,
      sphere.sceneRotation[2],
      ZOOM_SPEED
    )
    camera.updateProjectionMatrix()
    camera.rotateZ(-0.0005)
  })

  const numberOfShapes = font === "monospace" ? 2 : font === "sans" ? 12 : 24

  const allSpheres = {
    ...spheres,
    ...otherSpheres,
  }

  return (
    <>
      <OrthographicCamera zoom={20} />
      <CameraControls />
      {Object.keys(allSpheres).map((key: keyof Spheres) => {
        const sphere = allSpheres[key]
        return (
          <Sphere
            key={key}
            args={[sphere.size, numberOfShapes, numberOfShapes]}
            position={sphere.position}
            rotation={sphere.rotation}
          >
            <meshPhongMaterial
              color={COLOR}
              wireframe
              transparent
              opacity={key === "main" ? 1 : 0.3}
            />
          </Sphere>
        )
      })}
      {/* <gridHelper args={[400, 400, 400]} /> */}
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[0, 6, 0]} />
    </>
  )
}

export default function Spheres() {
  const { displayFont, font } = useFont()
  return (
    <Canvas
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
