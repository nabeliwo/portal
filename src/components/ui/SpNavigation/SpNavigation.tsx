import { useRouter } from 'next/dist/client/router'
import React, { VFC } from 'react'
import styled from 'styled-components'

import { color, space } from '../../../constants/theme'
import { SiteMapItem } from '../../../libs/content'

import { SpNavigationItem } from './SpNavigationItem'

type Props = {
  siteMap: SiteMapItem[]
  onClick: () => void
}

export const SpNavigation: VFC<Props> = ({ siteMap, onClick }) => {
  const router = useRouter()
  const category = router.query.category

  let currentPath = '/'

  if (router.pathname === '/404') {
    currentPath = '/404'
  } else if (category && Array.isArray(category) && category.length >= 1) {
    currentPath = `/${category[0]}`
  }

  return (
    <Wrapper>
      {siteMap.map(({ path, name, order }) => (
        <li key={`${path}-${order}`}>
          <SpNavigationItem to={path} currentPath={currentPath} onClick={onClick}>
            {name || 'トップ'}
          </SpNavigationItem>
        </li>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  padding: ${space.XS}px;
  background: repeating-linear-gradient(to bottom, ${color.BLACK}, ${color.BLACK} 3px, ${color.GREY} 3px, ${color.GREY} 5px);
`
