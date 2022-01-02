import React, { ReactNode, VFC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { service } from '../../../constants/application'
import { color, fontSize, media, space } from '../../../constants/theme'
import { useSpNavigation } from '../../../hooks/useSpNavigation'

import { WaveFrame } from '../../effect/WaveFrame'
import { SiteTitle } from '../../ui/SiteTitle'
import { Navigation } from '../../ui/Navigation'
import { SiteMapItem } from '../../../libs/content'

type Props = {
  siteMap: SiteMapItem[]
  children: ReactNode
}

export const ApplicationLayout: VFC<Props> = ({ siteMap, children }) => {
  const { navigationButton, elements } = useSpNavigation(siteMap)

  return (
    <>
      <CanvasWrapper>
        <WaveFrame />
      </CanvasWrapper>

      <Container>
        <Inner>
          <Header>
            <SiteTitle />
            <NavigationWrapper>{navigationButton}</NavigationWrapper>
          </Header>

          <Content>
            <Side>
              <Navigation siteMap={siteMap} />
            </Side>

            <Main>{children}</Main>

            <Footer>
              <FooterButtonList>
                <li>
                  <Link href="/">
                    <a>
                      <FooterButton as="span">サイトトップへ</FooterButton>
                    </a>
                  </Link>
                </li>
                <li>
                  <FooterButton
                    onClick={() => {
                      scrollTo(0, 0)
                    }}
                  >
                    ページトップへ
                  </FooterButton>
                </li>
              </FooterButtonList>

              <Copy>&copy; {service.siteName}</Copy>
            </Footer>
          </Content>
        </Inner>
      </Container>

      {elements}
    </>
  )
}

const CanvasWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const Container = styled.div`
  position: relative;
  height: 100vh;
  padding: ${space.M}px;
  box-sizing: border-box;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    padding: ${space.XS}px;
  }
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${space.M}px ${space.M}px 0;
  box-sizing: border-box;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    height: auto;
    padding: ${space.XS}px ${space.XS}px 0;
  }
`
const Header = styled.header`
  margin-bottom: ${space.M}px;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${space.S}px;
  }
`
const NavigationWrapper = styled.div`
  display: none;
  z-index: 10;
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  background: repeating-linear-gradient(to bottom, ${color.BLACK}, ${color.BLACK} 3px, ${color.GREY} 3px, ${color.GREY} 5px);

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: block;
  }
`
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 1 0%;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: block;
  }
`
const Side = styled.div`
  margin-right: ${space.M}px;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: none;
  }
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;

  /* 40px === SiteTitle height */
  height: calc(100vh - ${space.M}px - ${space.M}px - 40px - ${space.M}px - ${space.M}px);

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: block;
    height: auto;
  }
`
const Footer = styled.footer`
  position: relative;
  display: none;
  padding: ${space.M}px 0;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: block;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 50%;
    width: calc(100% - ${space.XS}px);
    height: 2px;
    background-color: ${color.BLUE};
    transform: translateX(-50%);
    content: '';
  }
`
const FooterButtonList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${space.S}px;

  & > li:first-child {
    margin-right: ${space.XS}px;
  }
`
const FooterButton = styled.button`
  font-family: 'PixelMplus12-Regular';
  font-size: ${fontSize.M};
  text-decoration: underline;
`
const Copy = styled.p`
  font-size: ${fontSize.L};
  text-align: center;
`
