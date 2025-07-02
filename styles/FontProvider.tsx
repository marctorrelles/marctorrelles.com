import * as React from "react"

export type Font = "monospace" | "serif" | "sans"
export const TIMEOUT = 300

const LOCAL_STORAGE_KEY = "font"

type FontProviderProps = {
  children: React.ReactNode
}

type FontContext = {
  font: Font
  displayFont: Font
  setFont: (font: Font) => void
}

const FontContext = React.createContext<FontContext>({
  font: "serif",
  displayFont: "serif",
  setFont: () => {},
})

const getStorageFont = (): Font => {
  if (typeof window === "undefined") return "serif"

  const font = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (["monospace", "serif", "sans"].includes(font)) return font as Font

  return "serif"
}

const setStorageFont = (font: Font) => {
  if (typeof window === "undefined") return

  localStorage.setItem(LOCAL_STORAGE_KEY, font)
}

export const FontProvider = ({ children }: FontProviderProps) => {
  const [requested, setRequested] = React.useState<Font>(getStorageFont())
  const [displayFont, setFinalFont] = React.useState<Font>(getStorageFont())
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  function setFont(font: Font) {
    if (timeoutRef.current) return

    setRequested(font)
    timeoutRef.current = setTimeout(() => {
      setFinalFont(font)
      setStorageFont(font)

      timeoutRef.current = null
    }, TIMEOUT)
  }

  return (
    <FontContext.Provider value={{ font: requested, displayFont, setFont }}>
      {children}
    </FontContext.Provider>
  )
}

export const FontConsumer = FontContext.Consumer

export const useFont = () => {
  const context = React.useContext(FontContext)

  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider")
  }

  return context
}
