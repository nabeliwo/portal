import React, { VFC } from 'react'
import styled from 'styled-components'

import { Content, SiteMapItem } from '../../../libs/content'
import { color, fontSize, media, space } from '../../../constants/theme'

import { SubNavigation } from '../../ui/SubNavigation'

type Props = {
  content: Content
  categoryName?: string
  siteMap?: SiteMapItem[]
  isTopPage?: boolean
  isCategoryTopPage?: boolean
}

export const Post: VFC<Props> = ({ content, categoryName = '', siteMap, isTopPage = false, isCategoryTopPage = false }) => (
  <>
    {!isTopPage && <CategoryTitle as={isCategoryTopPage ? 'h1' : undefined}>{categoryName}</CategoryTitle>}

    {siteMap && (
      <NavigationWrapper>
        <SubNavigation siteMap={siteMap} />
      </NavigationWrapper>
    )}

    {!isTopPage && !isCategoryTopPage && <Headline>{content.title}</Headline>}

    <Html dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
  </>
)

const CategoryTitle = styled.p`
  margin-bottom: ${space.S}px;
  font-size: ${fontSize.XXL};
  line-height: 1;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    font-size: ${fontSize.XL};
  }
`
const NavigationWrapper = styled.div`
  &:not(:empty) {
    margin-bottom: ${space.L}px;

    @media screen and (max-width: ${media.BREAK_POINT}px) {
      margin-bottom: ${space.M}px;
    }
  }
`
const Headline = styled.h1`
  margin-bottom: ${space.L}px;
  font-size: ${fontSize.XXL};
  line-height: 1;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    margin-bottom: ${space.M}px;
    font-size: ${fontSize.XL};
  }
`
const Html = styled.div`
  overflow-y: auto;
  flex: 1;
  padding-bottom: ${space.L}px;
  line-height: 1.8;

  h2 {
    margin: ${space.M}px 0 ${space.S}px;
    font-size: ${fontSize.L};

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    margin-bottom: ${space.S}px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  ul {
    margin-bottom: ${space.S}px;
    padding-left: 1.5em;

    ul {
      margin-bottom: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  li {
    position: relative;

    &::before {
      position: absolute;
      top: 12px;
      left: -18px;
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: ${color.BLUE};
      content: '';
    }

    p {
      margin: 0;
    }
  }
`