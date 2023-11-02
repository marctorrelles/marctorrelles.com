import styled from "styled-components"
import Link from "./Link"
import Text from "./Text"

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1em;
  width: 100%;
`

const LinksContainer = styled.div`
  ustify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 1.4em;
`

enum Social {
  LinkedIn = "https://linkedin.com/in/marctorrelles",
  GitHub = "https://github.com/marctorrelles",
  X = "https://x.com/marctorrelles",
  Email = "mailto:marctorrelles@gmail.com",
}

type SocialKey = keyof typeof Social

function keyText(key: string) {
  if (key === "X") return <span style={{ fontSize: "1.2em" }}>𝕏</span>
  return key
}

const Footer = () => (
  <Container>
    <LinksContainer>
      {Object.entries(Social).map(
        ([key, value]: [SocialKey, (typeof Social)[SocialKey]]) => (
          <Text key={key}>
            <Link href={value} active={false} target="_blank">
              {keyText(key)}
            </Link>
          </Text>
        )
      )}
    </LinksContainer>
  </Container>
)

export default Footer
