import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Grainient = dynamic(() => import("./Grainient"), { ssr: false })

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
`

// react-bits Grainient (https://reactbits.dev/backgrounds/grainient), near static, desaturated blues
export default function Background() {
  const [light, setLight] = useState(false)
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: light)")
    const sync = () => setLight(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])
  return (
    <Wrapper aria-hidden="true">
      <Grainient
        timeSpeed={0.075}
        warpSpeed={1}
        grainAmount={0.1}
        contrast={light ? 2 : 1.5}
        saturation={light ? 0.4 : 0.7}
        color1="#0a0e16"
        color2="#161f2e"
        color3="#33445e"
        lightMode={light}
      />
    </Wrapper>
  )
}
