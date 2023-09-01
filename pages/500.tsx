import PageContainer from "../components/organisms/PageContainer"
import Title from "../components/atoms/Title"
import Text from "../components/atoms/Text"
import Link from "../components/Link"
import { Links } from "../components/organisms/Nav"
import Image from "next/image"

const Home = () => (
  <PageContainer>
    <Title>500 - Server error</Title>
    <Image
      width="1920"
      height="1080"
      priority
      quality={100}
      src="/server-error.gif"
      alt="Server error"
    />
    <Link href={Links.Home}>Go back home</Link>
  </PageContainer>
)

export default Home
