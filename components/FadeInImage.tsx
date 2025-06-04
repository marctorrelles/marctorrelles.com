import { motion } from "framer-motion"
import NextImage from "next/image"
import { ComponentProps, useState } from "react"
import styled from "styled-components"

const ImageContainer = motion(styled.div`
  width: 100%;
`)

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
