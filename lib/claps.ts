export function getRedisKey(slug: string) {
  return `claps_${
    process.env.NODE_ENV === "production" ? "prod" : "dev"
  }_${slug}`
}
