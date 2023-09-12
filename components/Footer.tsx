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
  GitHub = "https://github.com/marctorrelles",
  Twitter = "https://twitter.com/marctorrelles",
  Email = "mailto:marctorrelles@gmail.com",
}

type SocialKey = keyof typeof Social

const Footer = () => (
  <Container>
    <LinksContainer>
      {Object.entries(Social).map(
        ([key, value]: [SocialKey, (typeof Social)[SocialKey]]) => (
          <Text key={key}>
            <Link href={value} active={false} target="_blank">
              {key}
            </Link>
          </Text>
        )
      )}
    </LinksContainer>
  </Container>
)

export default Footer
