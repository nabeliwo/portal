import React, { VFC } from 'react'
import styled from 'styled-components'

import { color, media } from '../../constants/theme'

type Props = {
  onClick: () => void
}

export const NavigationButton: VFC<Props> = ({ onClick }) => (
  <Wrapper onClick={onClick}>
    <span />
    <span />
    <span />
  </Wrapper>
)

const Wrapper = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 30px;

  @media screen and (min-width: ${media.BREAK_POINT + 1}px) {
    display: none;
  }

  & > span {
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
`
