import PageContainer from "../components/PageContainer"
import Title from "../components/Title"
import Text from "../components/Text"
import Link from "../components/Link"
import { Links } from "../components/Nav"
import Image from "next/image"

const Home = () => (
  <PageContainer>
    <Title>404 - Not found</Title>
    <Text>
      <Image
        width="1920"
        height="1080"
        priority
        quality={100}
        src="/not-found-travolta.gif"
        alt="Not found"
      />
      <Link href={Links.Home}>Go back home</Link>
    </Text>
  </PageContainer>
)

export default Home
