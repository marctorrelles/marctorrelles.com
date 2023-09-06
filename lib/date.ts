export function formatDate(fullDate: string) {
  const date = new Date(fullDate)
  return date.toLocaleDateString()
}
