import { useFrame } from "@react-three/fiber"
import { useRouter } from "next/router"
import { MathUtils, Mesh } from "three"
import { meshesInfo } from "./meshesInfo"

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

export function useCustomFrame(refs: {
  orangeMesh: React.MutableRefObject<Mesh | undefined>
  redMesh: React.MutableRefObject<Mesh | undefined>
  greenMesh: React.MutableRefObject<Mesh | undefined>
  blueMesh: React.MutableRefObject<Mesh | undefined>
}) {
  const { orangeMesh, redMesh, greenMesh, blueMesh } = refs
  const { pathname } = useRouter()
  const path = getPath(pathname)

  const keys = Object.keys(refs)
  const randomRefIndex = Math.floor(Math.random() * keys.length)
  const randomRef = refs[keys[randomRefIndex]]
  const otherRefs = { ...refs }
  delete otherRefs[keys[randomRefIndex]]

  useFrame(({ camera, scene }) => {
    if (orangeMesh.current === undefined) return
    if (redMesh.current === undefined) return
    if (greenMesh.current === undefined) return
    if (blueMesh.current === undefined) return

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
        3.4,
        0.5,
        0.1
      )
      randomRef.current.scale.y = MathUtils.damp(
        randomRef.current.scale.y,
        3.4,
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
          meshesInfo[path].positions[key][0],
          0.5,
          0.1
        )
        ref.current.position.x = MathUtils.damp(
          ref.current.position.x,
          meshesInfo[path].positions[key][1],
          0.5,
          0.1
        )
        ref.current.scale.x = MathUtils.damp(
          ref.current.scale.x,
          meshesInfo[path].scales[key][0],
          0.5,
          0.1
        )
        ref.current.scale.y = MathUtils.damp(
          ref.current.scale.y,
          meshesInfo[path].scales[key][1],
          0.5,
          0.1
        )
      })
    }

    camera.zoom = MathUtils.lerp(camera.zoom, 30, 0.05)

    camera.updateProjectionMatrix()
    scene.updateMatrixWorld()
  })
}
