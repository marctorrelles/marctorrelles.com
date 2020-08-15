import * as React from 'react'
import { ThemeParams } from '../styles/theme'

const MobileContext = React.createContext<boolean>(false)

type Props = {
  children: React.ReactNode
}

export const MobileProvider = ({ children }: Props) => {
  const [width, setWidth] = React.useState(null)

  React.useEffect(() => {
    const checkWindowWidth = () => {
      if (window && window.innerWidth !== width) {
        setWidth(window.innerWidth)
      }
    }

    window.addEventListener('resize', checkWindowWidth)
    checkWindowWidth()

    return () => window.removeEventListener('resize', checkWindowWidth)
  }, [])

  const isMobile = width < ThemeParams.MobileBreakpoint

  // ⚠️ This prevents the page to render if we don't have real width values,
  // but means a performance sacrifice since we render content at 2nd render
  if (width === null) return null

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  )
}

export const useMobile = () => React.useContext(MobileContext)
