import { OrthographicCamera, Sphere, Circle } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { SP } from "next/dist/shared/lib/utils"
import { useRouter } from "next/router"
import { useMemo, useRef } from "react"
import THREE, { MathUtils, Mesh, MeshPhysicalMaterial, Vector3 } from "three"

const SPHERE_SEPARATION = 6

const positions = {
  initial: {
    spheres: {
      orangeSphere: [SPHERE_SEPARATION, 0],
      redSphere: [-SPHERE_SEPARATION, 0],
      greenSphere: [SPHERE_SEPARATION, 0],
      blueSphere: [-SPHERE_SEPARATION, 0],
    },
    scales: {
      orangeSphere: [1, 1],
      redSphere: [1, 1],
      greenSphere: [0, 0],
      blueSphere: [0, 0],
    },
  },
  photos: {
    spheres: {
      orangeSphere: [SPHERE_SEPARATION, SPHERE_SEPARATION],
      redSphere: [-SPHERE_SEPARATION, -SPHERE_SEPARATION],
      greenSphere: [SPHERE_SEPARATION, -SPHERE_SEPARATION],
      blueSphere: [-SPHERE_SEPARATION, SPHERE_SEPARATION],
    },
    scales: {
      orangeSphere: [1.1, 1.1],
      redSphere: [1.1, 1.1],
      greenSphere: [1.1, 1.1],
      blueSphere: [1.1, 1.1],
    },
  },
  posts: {
    spheres: {
      orangeSphere: [-SPHERE_SEPARATION * 1.5, SPHERE_SEPARATION * 1.5],
      greenSphere: [SPHERE_SEPARATION * 1.5, SPHERE_SEPARATION * 1.5],
      redSphere: [SPHERE_SEPARATION * 1.5, -SPHERE_SEPARATION * 1.5],
      blueSphere: [-SPHERE_SEPARATION * 1.5, -SPHERE_SEPARATION * 1.5],
    },
    scales: {
      orangeSphere: [1.5, 1.5],
      redSphere: [1.5, 1.5],
      greenSphere: [1.5, 1.5],
      blueSphere: [1.5, 1.5],
    },
  },
} as const

function getPath(pathname: string) {
  if (pathname === "/posts") {
    return "posts"
  }
  if (pathname === "/photos") {
    return "photos"
  }
  if (pathname === "/") {
    return "initial"
  }
  return "other"
}

function Spheres() {
  const { pathname } = useRouter()

  const orangeSphere = useRef<Mesh>()
  const redSphere = useRef<Mesh>()
  const greenSphere = useRef<Mesh>()
  const blueSphere = useRef<Mesh>()

  const refs = { orangeSphere, redSphere, greenSphere, blueSphere }
  const keys = Object.keys(refs)
  const randomRefIndex = Math.floor(Math.random() * keys.length)
  const randomRef = refs[keys[randomRefIndex]]
  const otherRefs = { ...refs }
  delete otherRefs[keys[randomRefIndex]]

  const path = getPath(pathname)

  useFrame(({ camera, scene }) => {
    if (orangeSphere.current === undefined) return
    if (redSphere.current === undefined) return
    if (greenSphere.current === undefined) return
    if (blueSphere.current === undefined) return

    if (path === "other") {
      randomRef.current.position.y = MathUtils.damp(
        randomRef.current.position.y,
        0,
        0.5,
        0.1
      )
      randomRef.current.position.x = MathUtils.damp(
        randomRef.current.position.x,
        0,
        0.5,
        0.1
      )
      randomRef.current.scale.x = MathUtils.damp(
        randomRef.current.scale.x,
        4,
        0.5,
        0.1
      )
      randomRef.current.scale.y = MathUtils.damp(
        randomRef.current.scale.y,
        4,
        0.5,
        0.1
      )

      Object.values(otherRefs).forEach((ref) => {
        ref.current.position.y = MathUtils.damp(
          ref.current.position.y,
          50,
          0.5,
          0.1
        )
        ref.current.position.x = MathUtils.damp(
          ref.current.position.x,
          50,
          0.5,
          0.1
        )
      })
    } else {
      Object.keys(refs).forEach((key: keyof typeof refs) => {
        const ref = refs[key]
        ref.current.position.y = MathUtils.damp(
          ref.current.position.y,
          positions[path].spheres[key][0],
          0.5,
          0.1
        )
        ref.current.position.x = MathUtils.damp(
          ref.current.position.x,
          positions[path].spheres[key][1],
          0.5,
          0.1
        )
        ref.current.scale.x = MathUtils.damp(
          ref.current.scale.x,
          positions[path].scales[key][0],
          0.5,
          0.1
        )
        ref.current.scale.y = MathUtils.damp(
          ref.current.scale.y,
          positions[path].scales[key][1],
          0.5,
          0.1
        )
      })
    }

    camera.zoom = MathUtils.lerp(camera.zoom, 30, 0.05)

    camera.updateProjectionMatrix()
    scene.updateMatrixWorld()
  })

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 100]} />
      <ambientLight />
      {/* <pointLight position={[0, 0, 10]} /> */}
      <Circle
        ref={orangeSphere}
        args={[10, 128, 128]}
        scale={0}
        position={[0, 0, SPHERE_SEPARATION]}
      >
        <meshPhysicalMaterial color="#f58240" transparent opacity={0.5} />
      </Circle>
      <Circle
        ref={redSphere}
        args={[10, 128, 128]}
        scale={0}
        position={[0, 0, -SPHERE_SEPARATION]}
      >
        <meshPhysicalMaterial color="#fa2a2a" transparent opacity={0.5} />
      </Circle>
      <Circle
        ref={greenSphere}
        args={[10, 128, 128]}
        scale={0}
        position={[0, 0, SPHERE_SEPARATION * 2]}
      >
        <meshPhysicalMaterial color="#2afa2a" transparent opacity={0.3} />
      </Circle>
      <Circle
        ref={blueSphere}
        args={[10, 128, 128]}
        scale={0}
        position={[0, 0, -SPHERE_SEPARATION * 2]}
      >
        <meshPhysicalMaterial color="#2a2afa" transparent opacity={0.4} />
      </Circle>
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
