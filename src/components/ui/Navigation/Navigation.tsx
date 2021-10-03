import { useRouter } from 'next/dist/client/router'
import React, { VFC } from 'react'
import styled from 'styled-components'

import { SiteMapItem } from '../../../libs/content'
import { color } from '../../../constants/theme'

import { NavigationItem } from './NavigationItem'

type Props = {
  siteMap: SiteMapItem[]
}

export const Navigation: VFC<Props> = ({ siteMap }) => {
  const router = useRouter()
  const category = router.query.category

  let currentPath = '/'

  if (category && Array.isArray(category) && category.length >= 1) {
    currentPath = `/${category[0]}`
  }

  return (
    <Wrapper>
      <ul>
        {siteMap.map(({ path, name, order }) => (
          <li key={`${path}-${order}`}>
            <NavigationItem to={path} currentPath={currentPath}>
              {name || 'トップ'}
            </NavigationItem>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  padding-left: 8px;
  border-left: 4px solid ${color.BLUE};
`
