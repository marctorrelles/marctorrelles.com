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
        timeSpeed={0.15}
        warpSpeed={1}
        grainAmount={0.15}
        contrast={light ? 2.2 : 1.5}
        saturation={0.5}
        color1={light ? "#526d9d" : "#101724"}
        color2={light ? "#cad7ec" : "#1b3056"}
        color3={light ? "#cad4e4" : "#2d405f"}
        lightMode={light}
      />
    </Wrapper>
  )
}
