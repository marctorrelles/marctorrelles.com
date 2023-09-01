import PageContainer from "../components/organisms/PageContainer"
import Title from "../components/atoms/Title"
import Text from "../components/atoms/Text"
import Link from "../components/Link"
import { Links } from "../components/organisms/Nav"

const Home = () => (
  <PageContainer>
    <Title>Hey there, I'm Marc! 👋</Title>
    <Text>
      I'm a software engineer based in Barcelona, currently working at{" "}
      <Link href="https://factorialhr.com" target="_blank">
        Factorial HR
      </Link>
    </Text>
    <Text>
      I've recently started to write stuff at my{" "}
      <Link href={Links.Blog}>blog</Link>, not only technical but whatever that
      comes my way. Check it out!
    </Text>
    <Text>
      You can read more about me <Link href={Links.About}>here</Link>
    </Text>
  </PageContainer>
)

export default Home
