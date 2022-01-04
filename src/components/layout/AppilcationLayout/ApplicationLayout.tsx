import React, { ReactNode, VFC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { service } from '../../../constants/application'
import { color, fontSize, media, space } from '../../../constants/theme'
import { useSpNavigation } from '../../../hooks/useSpNavigation'
import { useSimpleMode } from '../../../hooks/useSimpleMode'

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
  const { simpleMode, setSimpleMode } = useSimpleMode()

  const simpleModeContent = (
    <>
      <SimpleModeLabel>シンプル表示モード</SimpleModeLabel>

      <SimpleModeToggle>
        <ToggleButton className={simpleMode ? 'active' : ''} onClick={() => setSimpleMode(true)}>
          ON
        </ToggleButton>
        <ToggleButton className={simpleMode ? '' : 'active'} onClick={() => setSimpleMode(false)}>
          OFF
        </ToggleButton>
      </SimpleModeToggle>
    </>
  )

  return (
    <>
      {!simpleMode && (
        <CanvasWrapper>
          <WaveFrame />
        </CanvasWrapper>
      )}

      <Container className={simpleMode ? 'simpleMode' : ''}>
        <Inner className={simpleMode ? 'border' : ''}>
          <Header>
            <SiteTitle simpleMode={simpleMode} />
            <NavigationWrapper>{navigationButton}</NavigationWrapper>
          </Header>

          <Content>
            <SimpleMode>{simpleModeContent}</SimpleMode>

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

              <SimpleMode className="sp">{simpleModeContent}</SimpleMode>

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
  font-family: PixelMplus12-Regular, system-ui, sans-serif;
  box-sizing: border-box;

  &.simpleMode {
    height: 100%;
    background-color: ${color.BLACK};
    font-family: system-ui, sans-serif;
  }

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

  &.border {
    border: 1px solid ${color.BLUE};
  }

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    height: auto;
    padding: ${space.XS}px ${space.XS}px 0;

    &.border {
      border-top: none;
      border-bottom: none;
    }
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
  position: relative;
  display: flex;
  align-items: flex-start;
  flex: 1 1 0%;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: block;
  }
`
const SimpleMode = styled.div`
  position: absolute;
  bottom: ${space.M}px;
  left: 0;

  &.sp {
    position: static;
    display: none;
    flex-direction: column;
    align-items: center;
    margin-bottom: ${space.M}px;
  }

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: none;

    &.sp {
      display: flex;
    }
  }
`
const SimpleModeLabel = styled.p`
  margin-bottom: ${space.XS}px;
  font-size: ${fontSize.S};
`
const SimpleModeToggle = styled.div`
  display: inline-flex;
  border: 1px solid ${color.BLUE};
`
const ToggleButton = styled.button`
  width: 65px;
  padding: ${space.XS / 2}px;
  font-size: ${fontSize.S};
  cursor: pointer;

  &:hover,
  &.active {
    background: repeating-linear-gradient(
      to bottom,
      ${color.BLUE},
      ${color.BLUE} 3px,
      ${color.LIGHT_BLUE} 3px,
      ${color.LIGHT_BLUE} 5px
    );
    color: ${color.BLACK};
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
  margin-bottom: ${space.M}px;

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
