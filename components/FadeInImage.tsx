import { AnimatePresence, motion } from "framer-motion"
import { ComponentProps, useState } from "react"
import NextImageComponent from "next/future/image"
import styled from "styled-components"

const ImageContainer = motion(styled.div`
  overflow: hidden;
  position: relative;
`)

const NextImage = motion(styled(NextImageComponent)``)

const SkeletonContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
`

// Skeleton with framer-motion
function Skeleton() {
  return (
    <SkeletonContainer
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  )
}

const FadeInImage = (props: ComponentProps<typeof NextImage>) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <ImageContainer>
      <AnimatePresence>
        <SkeletonContainer
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <NextImage
          animate={isLoaded ? "loaded" : "loading"}
          variants={{
            loading: {
              opacity: 0,
            },
            loaded: {
              opacity: 1,
            },
          }}
          {...props}
          onLoad={() => {
            setTimeout(() => {
              setIsLoaded(true)
            }, 4000)
            // setIsLoaded(true)
          }}
        />
      </AnimatePresence>
    </ImageContainer>
  )
}

export default FadeInImage
