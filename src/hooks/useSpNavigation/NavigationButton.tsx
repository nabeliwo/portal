import React, { VFC } from 'react'
import styled from 'styled-components'

import { color, media } from '../../constants/theme'

type Props = {
  onClick: () => void
}

export const NavigationButton: VFC<Props> = ({ onClick }) => (
  <Button onClick={onClick}>
    <span className="bar" />
    <span className="bar" />
    <span className="bar" />
    <span className="visuallyHidden">ナビゲーションメニューを開く</span>
  </Button>
)

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 30px;

  @media screen and (min-width: ${media.BREAK_POINT + 1}px) {
    display: none;
  }

  & > .bar {
    position: absolute;
    left: 0;
    width: 22px;
    height: 3px;
    background-color: ${color.BLUE};

    &:nth-child(1) {
      top: 7px;
    }
    &:nth-child(2) {
      top: 14px;
    }
    &:nth-child(3) {
      top: 21px;
    }
  }
  & > .visuallyHidden {
    position: absolute;
    top: -1px;
    left: 0;
    width: 1px;
    height: 1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
`
