import React, { FC } from 'react'
import { AppProps } from 'next/app'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import { color, media } from '../constants/theme'

import { WaveFrame } from '../components/effect/WaveFrame'

const App: FC<AppProps> = ({ Component }) => (
  <>
    <GlobalStyle />

    <CanvasWrapper>
      <WaveFrame />
    </CanvasWrapper>

    <Container>
      <Component />
    </Container>
  </>
)

export default App

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'PixelMplus10-Regular';
    src: url('/font/PixelMplus10-Regular.otf') format('opentype');
  }

  html {
    min-height: 100%;
  }
  body {
    min-height: 100%;
    background-color: ${color.BLACK};
    color: ${color.BLUE};
    font-family: PixelMplus10-Regular, system-ui, sans-serif;
    letter-spacing: 1px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img {
    vertical-align: middle;
  }
  input, button, textarea {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    background-color: inherit;
    color: inherit;
  }

  @media screen and (min-width: ${media.BREAK_POINT + 1}px) {
    ::-webkit-scrollbar {
      width: 15px;
      height: 15px;
      border: 1px solid ${color.BLUE};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${color.BLUE};
    }
  }
`
const Container = styled.div`
  position: relative;
`
const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
