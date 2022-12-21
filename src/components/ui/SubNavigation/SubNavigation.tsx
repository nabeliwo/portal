import { useRouter } from 'next/dist/client/router'
import React, { VFC } from 'react'
import styled from 'styled-components'

import { fontSize, media, space } from '../../../constants/theme'
import { SiteMapItem } from '../../../libs/content'

import { SubNavigationItem } from './SubNavigationItem'

type Props = {
  siteMap: SiteMapItem[]
}

export const SubNavigation: VFC<Props> = ({ siteMap }) => {
  const router = useRouter()
  const path = router.query.category

  if (!path || !Array.isArray(path) || path.length === 0) return null

  const currentCategory = siteMap.find((item) => item.path === `/${path[0]}`)

  if (!currentCategory || !currentCategory.children || currentCategory.children.length <= 1) return null

  return (
    <Wrapper>
      {currentCategory.children.map((item) => (
        <li key={`${item.path}-${item.order}`}>
          <SubNavigationItem to={item.path} currentPath={`/${path.join('/')}`}>
            {currentCategory.path === item.path ? 'トップ' : item.name}
          </SubNavigationItem>
        </li>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  padding-left: ${space.XS}px;

  &::before {
    margin-right: ${space.XS}px;
    font-size: ${fontSize.L};
    content: '＞';
  }

  & > li:not(:first-child) {
    margin-left: ${space.XS}px;
  }

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    padding-left: 0;

    &::before {
      margin-right: 5px;
      font-size: ${fontSize.S};
    }

    & > li:not(:first-child) {
      margin-left: 5px;
    }
  }
`
