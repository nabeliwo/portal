import React, { VFC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { color, space } from '../../../constants/theme'

type Props = {
  to: string
  currentPath: string
  children: string
}

export const NavigationItem: VFC<Props> = ({ to, currentPath, children }) => {
  const toCategory = to.split('/')[1]
  const currentCategory = currentPath.split('/')[1]
  const isCurrent = toCategory === currentCategory
  const item = <Item className={isCurrent ? 'active' : ''}>{children}</Item>

  if (isCurrent) {
    return item
  }

  return (
    <Link href={to}>
      <a>{item}</a>
    </Link>
  )
}

const Item = styled.span`
  display: flex;
  width: 200px;
  padding: ${space.XS}px;
  color: ${color.BLUE};
  text-decoration: none;

  &::before {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: ${space.XS}px;
    background-color: ${color.BLUE};
    content: '';
  }

  &.active,
  &:hover {
    background-color: ${color.BLUE};
    color: ${color.BLACK};

    &::before {
      background-color: ${color.BLACK};
    }
  }
`
