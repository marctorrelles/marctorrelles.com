import styled from "styled-components"
import Link from "./Link"
import Text from "./Text"
import { MAIN_SEPARATION } from "../styles/theme"

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  right: -${MAIN_SEPARATION - 10}px;
  bottom: ${MAIN_SEPARATION - 10}px;
`

const LinksContainer = styled.div`
  ustify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.3em;
  writing-mode: vertical-rl;
  text-orientation: mixed;
`

enum Social {
  LinkedIn = "https://linkedin.com/in/marctorrelles",
  GitHub = "https://github.com/marctorrelles",
  X = "https://x.com/marctorrelles",
  Email = "mailto:marctorrelles@gmail.com",
  RSS = "/rss.xml",
}

type SocialKey = keyof typeof Social

function keyText(key: string) {
  if (key === "X") return <span style={{ fontSize: "1.2em" }}>𝕏</span>
  return key
}

const Footer = () => (
  <Container>
    <LinksContainer style={{}}>
      {Object.entries(Social).map(
        ([key, value]: [SocialKey, (typeof Social)[SocialKey]]) => (
          <Text variant="sidebar" key={key}>
            <Link variant="sidebar" href={value} active={false} target="_blank">
              {keyText(key)}
            </Link>
          </Text>
        )
      )}
    </LinksContainer>
  </Container>
)

export default Footer
