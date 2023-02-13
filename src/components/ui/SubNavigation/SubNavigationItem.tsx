import Link from 'next/link'
import React, { VFC } from 'react'
import styled from 'styled-components'

import { color, fontSize, media, space } from '../../../constants/theme'

type Props = {
  to: string
  currentPath: string
  children: string
}

export const SubNavigationItem: VFC<Props> = ({ to, currentPath, children }) => {
  const isCurrent = to === currentPath
  const item = <Item className={isCurrent ? 'active' : ''}>{children}</Item>

  if (isCurrent) {
    return item
  }

  return <Link href={to}>{item}</Link>
}

const Item = styled.span`
  display: block;
  padding: 8px ${space.XS}px;
  color: ${color.BLUE};
  font-size: ${fontSize.L};
  text-decoration: none;

  &.active,
  &:hover {
    background-color: ${color.BLUE};
    color: ${color.BLACK};
  }

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    padding: 4px 5px;
    font-size: ${fontSize.S};
    line-height: 1.3;
  }
`
