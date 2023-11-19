const SPHERE_SEPARATION = 5

export const meshesInfo = {
  initial: {
    positions: {
      orangeMesh: [SPHERE_SEPARATION, 0],
      redMesh: [-SPHERE_SEPARATION, 0],
      greenMesh: [0, SPHERE_SEPARATION * 2],
      blueMesh: [0, -SPHERE_SEPARATION * 2],
    },
    scales: {
      orangeMesh: [1, 1],
      redMesh: [1, 1],
      greenMesh: [0.5, 0.5],
      blueMesh: [0.5, 0.5],
    },
  },
  posts: {
    positions: {
      orangeMesh: [-SPHERE_SEPARATION, SPHERE_SEPARATION],
      greenMesh: [SPHERE_SEPARATION, SPHERE_SEPARATION],
      redMesh: [SPHERE_SEPARATION, -SPHERE_SEPARATION],
      blueMesh: [-SPHERE_SEPARATION, -SPHERE_SEPARATION],
    },
    scales: {
      orangeMesh: [1, 1],
      redMesh: [1, 1],
      greenMesh: [1, 1],
      blueMesh: [1, 1],
    },
  },
  photos: {
    positions: {
      orangeMesh: [SPHERE_SEPARATION * 2, SPHERE_SEPARATION * 2],
      redMesh: [-SPHERE_SEPARATION * 2, -SPHERE_SEPARATION * 2],
      greenMesh: [SPHERE_SEPARATION * 2, -SPHERE_SEPARATION * 2],
      blueMesh: [-SPHERE_SEPARATION * 2, SPHERE_SEPARATION * 2],
    },
    scales: {
      orangeMesh: [2, 2],
      redMesh: [2, 2],
      greenMesh: [2, 2],
      blueMesh: [2, 2],
    },
  },
} as const
