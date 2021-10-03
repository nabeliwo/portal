import React, { ReactNode, VFC } from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'

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
  const { isClicked, navigationButton, elements } = useSpNavigation(siteMap)

  return (
    <>
      <CanvasWrapper>
        <WaveFrame />
      </CanvasWrapper>

      <Container className={isClicked ? 'shake' : ''}>
        <Inner>
          <Header>
            <SiteTitle />
            {navigationButton}
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

const shake = keyframes`
  9% {
    transform: translate(0%, 0%);
  }
  10% {
    transform: translate(-2%, -2%);
  }
  12% {
    transform: translate(-2%, -2%);
  }
  13% {
    transform: translate(0%, 0%);
  }
  20% {
    transform: translate(0%, 0%);
  }
  21% {
    transform: translate(2%, 0%);
  }
  23% {
    transform: translate(2%, 0%);
  }
  24% {
    transform: translate(0%, 0%);
  }
  40% {
    transform: translate(0%, 0%);
  }
  41% {
    transform: translate(-2%, 0%);
  }
  55% {
    transform: translate(-2%, 0%);
  }
  56% {
    transform: translate(0%, 0%);
  }
  65% {
    transform: translate(0%, 0%);
  }
  66% {
    transform: translate(-2%, 2%);
  }
  68% {
    transform: translate(-2%, 2%);
  }
  69% {
    transform: translate(2%, -2%);
  }
  71% {
    transform: translate(2%, -2%);
  }
  72% {
    transform: translate(-2%, 0%);
  }
  74% {
    transform: translate(-2%, 0%);
  }
  75% {
    transform: translate(2%, 2%);
  }
  77% {
    transform: translate(2%, 2%);
  }
  78% {
    transform: translate(-2%, -2%);
  }
  80% {
    transform: translate(-2%, -2%);
  }
  81% {
    transform: translate(2%, 0%);
  }
  83% {
    transform: translate(2%, 0%);
  }
  84% {
    transform: translate(0%, 0%);
  }
  90% {
    transform: translate(0%, 0%);
  }
  91% {
    transform: translate(10%, 0%);
  }
  100% {
    transform: translate(10%, 0%);
  }
`
const CanvasWrapper = styled.div`
  position: absolute;
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

  &.shake {
    animation: ${shake} 2s forwards;
  }
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${space.M}px ${space.M}px 0;
  box-sizing: border-box;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
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
  font-family: 'PixelMplus10-Regular';
  font-size: ${fontSize.M};
  text-decoration: underline;
`
const Copy = styled.p`
  font-size: ${fontSize.L};
  text-align: center;
`
