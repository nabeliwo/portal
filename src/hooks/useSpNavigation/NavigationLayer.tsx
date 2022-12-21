import React, { VFC } from 'react'
import styled, { keyframes } from 'styled-components'

import { SpNavigation } from '../../components/ui/SpNavigation'
import { color } from '../../constants/theme'
import { SiteMapItem } from '../../libs/content'

type Props = {
  simpleMode: boolean
  siteMap: SiteMapItem[]
  visible: boolean
  onClickClose: () => void
}

export const NavigationLayer: VFC<Props> = ({ simpleMode, siteMap, visible, onClickClose }) => {
  if (!visible) return null

  return (
    <Wrapper className={simpleMode ? 'simpleMode' : ''}>
      <Inner>
        <SpMenuCloseButton onClick={onClickClose}>
          <CloseIcon />
        </SpMenuCloseButton>

        <SpNavigation siteMap={siteMap} onClick={onClickClose} />
      </Inner>
    </Wrapper>
  )
}

const blink = keyframes`
  9% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  21% {
    opacity: 0.6;
  }
  30% {
    opacity: 0.6;
  }
  31% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  41% {
    opacity: 0;
  }
  42% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  61% {
    opacity: 0;
  }
  62% {
    opacity: 1;
  }
  63% {
    opacity: 0;
  }
  64% {
    opacity: 1;
  }
  65% {
    opacity: 0;
  }
  66% {
    opacity: 1;
  }
  67% {
    opacity: 0;
  }
  68% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  81% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.4;
  }
  91% {
    opacity: 1;
  }
`
const Wrapper = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: ${blink} 4s infinite;

  &.simpleMode {
    animation: none;
  }
`
const SpMenuCloseButton = styled.button`
  position: absolute;
  top: -60px;
  left: 50%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: repeating-linear-gradient(to bottom, ${color.BLACK}, ${color.BLACK} 3px, ${color.GREY} 3px, ${color.GREY} 5px);
  transform: translateX(-50%);
`
const CloseIcon = styled.div`
  position: relative;

  &::before,
  &::after {
    position: absolute;
    top: -1px;
    left: 14px;
    width: 22px;
    height: 3px;
    background-color: ${color.BLUE};
    content: '';
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`
const Inner = styled.div`
  position: relative;
`
