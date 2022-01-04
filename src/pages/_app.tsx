import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import { SiteMapItem } from '../libs/content'
import { color, media } from '../constants/theme'

import { SimpleModeContextProvider } from '../context/simpleMode'
import { ApplicationLayout } from '../components/layout/AppilcationLayout'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <SimpleModeContextProvider>
    <GlobalStyle />

    <ApplicationLayout siteMap={pageProps.siteMap as SiteMapItem[]}>
      <Component {...pageProps} />
    </ApplicationLayout>
  </SimpleModeContextProvider>
)

export default App

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'PixelMplus12-Regular';
    src: url('/fonts/PixelMplus12-Regular.otf') format('opentype');
  }

  html {
    min-height: 100%;
  }
  body {
    min-height: 100%;
    background: repeating-linear-gradient(to bottom, ${color.BLACK}, ${color.BLACK} 3px, ${color.GREY} 3px, ${color.GREY} 5px);
    color: ${color.BLUE};
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
