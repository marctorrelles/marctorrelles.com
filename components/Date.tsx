export function FormattedDate({ children }: { children: string }) {
  const date = new Date(children)
  return <span suppressHydrationWarning>{date.toLocaleDateString()} </span>
}
