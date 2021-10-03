import React, { ReactNode, VFC } from 'react'
import styled from 'styled-components'

import { media, space } from '../../../constants/theme'

import { WaveFrame } from '../../effect/WaveFrame'
import { SiteTitle } from '../../ui/SiteTitle'
import { Navigation } from '../../ui/Navigation'
import { SiteMapItem } from '../../../libs/content'

type Props = {
  siteMap: SiteMapItem[]
  children: ReactNode
}

export const ApplicationLayout: VFC<Props> = ({ siteMap, children }) => (
  <>
    <CanvasWrapper>
      <WaveFrame />
    </CanvasWrapper>

    <Container>
      <Inner>
        <TitleWrapper>
          <SiteTitle />
        </TitleWrapper>

        <Content>
          <NaviWrapper>
            <Navigation siteMap={siteMap} />
          </NaviWrapper>

          <Main>{children}</Main>
        </Content>
      </Inner>
    </Container>
  </>
)

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
  padding: ${space.L}px ${space.L}px ${space.M}px;
  box-sizing: border-box;
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`
const TitleWrapper = styled.div`
  margin-bottom: ${space.M}px;
`
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 1 0%;
`
const NaviWrapper = styled.div`
  margin-right: ${space.M}px;
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    display: block;
    height: auto;
  }
`
