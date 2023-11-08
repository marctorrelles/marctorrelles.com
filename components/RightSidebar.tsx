import styled from "styled-components"
import Link from "./Link"
import Text from "./Text"
import { MAIN_SEPARATION, ThemeParams } from "../styles/theme"

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  right: -22px;
  bottom: ${MAIN_SEPARATION}px;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    position: absolute;
    bottom: -22px;
    right: ${MAIN_SEPARATION / 2}px;
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
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 1em;
    writing-mode: horizontal-tb;
    text-orientation: sideways;
  }
`

enum Social {
  LinkedIn = "https://linkedin.com/in/marctorrelles",
  GitHub = "https://github.com/marctorrelles",
  X = "https://x.com/marctorrelles",
  Email = "mailto:hi@marctorrelles.com",
}

type SocialKey = keyof typeof Social

function keyText(key: string) {
  if (key === "X") return <span style={{ fontSize: "1.2em" }}>𝕏</span>
  return key
}

const RightSidebar = () => (
  <Container>
    <LinksContainer style={{}}>
      {Object.entries(Social).map(
        ([key, value]: [SocialKey, (typeof Social)[SocialKey]]) => (
          <Text variant="sidebar" key={key}>
            <Link variant="sidebar" href={value} active={true} target="_blank">
              {keyText(key)}
            </Link>
          </Text>
        )
      )}
    </LinksContainer>
  </Container>
)

export default RightSidebar
