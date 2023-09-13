import { motion } from "framer-motion"
import { ComponentProps, useState } from "react"
import NextImage from "next/future/image"

const ImageContainer = motion.div

const FadeInImage = (props: ComponentProps<typeof NextImage>) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <ImageContainer
      animate={isLoaded ? "loaded" : "loading"}
      variants={{
        loading: {
          opacity: 0,
        },
        loaded: {
          opacity: 1,
        },
      }}
    >
      <NextImage
        {...props}
        onLoad={() => {
          setIsLoaded(true)
        }}
      />
    </ImageContainer>
  )
}

export default FadeInImage
