import * as React from 'react'
import styled from 'styled-components'

type StyledContainerProps = {
  background?: string,
  height?: 'inherit' | '100%' | Number,
  width?: 'inherit' | '100%' | Number,
  borderRadius?: Number,
  flexDirection?: 'row' | 'column',
  alignItems?: 'flex-start' | 'flex-end' | 'center',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  padding?: Number,
  paddingTop?: Number,
  paddingBottom?: Number,
  paddingLeft?: Number,
  paddingRight?: Number,
}

const StyledConainer = styled.div<StyledContainerProps>`
  display: flex;
  ${({ background }) => background ? `background: ${ background };` : ''}
  height: ${({ height }) => typeof height === 'number' ? `${height}em` : 'height'};
  width: ${({ width }) => typeof width === 'number' ? `${width}em` : 'width'};
  ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius}px` : ''};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  ${({ padding }) => padding ? `padding: ${padding}em;` : ''}
  ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop}em;` : ''}
  ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom}em;` : ''}
  ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft}em;` : ''}
  ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight}em;` : ''}
`

type Props = StyledContainerProps & {
  children?: React.ReactNode
}

const Container = ({
  height = 'inherit',
  width = 'inherit',
  borderRadius,
  background,
  flexDirection = 'row',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  children
}: Props) => (
  <StyledConainer
    height={height}
    width={width}
    background={background}
    borderRadius={borderRadius}
    flexDirection={flexDirection}
    justifyContent={justifyContent}
    alignItems={alignItems}
    padding={padding}
    paddingTop={paddingTop}
    paddingBottom={paddingBottom}
    paddingLeft={paddingLeft}
    paddingRight={paddingRight}
  >
    {children}
  </StyledConainer>
)

export default Container
