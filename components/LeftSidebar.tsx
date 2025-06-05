import styled from "styled-components"
import { useFont } from "../styles/FontProvider"
import { MAIN_SEPARATION, ThemeParams } from "../styles/theme"
import Link from "./Link"
import Text from "./Text"

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  left: -22px;
  top: ${MAIN_SEPARATION}px;
  z-index: 200;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    position: absolute;
    top: -28px;
    left: ${MAIN_SEPARATION / 2}px;
  }
`

const LinksContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.3em;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 1em;
    writing-mode: horizontal-tb;
    text-orientation: sideways;
    transform: rotate(0);
  }
`

enum Fonts {
  Serif = "serif",
  Sans = "sans",
  Monospace = "monospace",
}

const LeftSidebar = () => {
  const { font, setFont } = useFont()

  return (
    <Container>
      <LinksContainer style={{}}>
        {Object.values(Fonts).map((value) => (
          <Text variant="sidebar" key={value}>
            <Link
              onClick={() => setFont(value)}
              active={font !== value}
              variant="sidebar"
            >
              {value.toUpperCase()}
            </Link>
          </Text>
        ))}
      </LinksContainer>
    </Container>
  )
}

export default LeftSidebar
