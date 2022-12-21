import React, { VFC } from 'react'
import styled from 'styled-components'

import { color, fontSize, media, space } from '../../../constants/theme'
import { Content, SiteMapItem } from '../../../libs/content'
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
    margin-bottom: ${space.XL}px;

    @media screen and (max-width: ${media.BREAK_POINT}px) {
      margin-bottom: ${space.M}px;
    }
  }
`
const Headline = styled.h1`
  margin-bottom: ${space.XL}px;
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
  padding-bottom: ${space.XL}px;
  line-height: 1.8;

  @media screen and (max-width: ${media.BREAK_POINT}px) {
    overflow-y: visible;
  }

  h2 {
    margin: ${space.L}px 0 ${space.S}px;
    font-size: ${fontSize.XL};

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    margin: ${space.M}px 0 ${space.S}px;
    font-size: ${fontSize.L};
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

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 50%;
    max-height: 500px;

    @media screen and (max-width: ${media.BREAK_POINT}px) {
      max-width: 100%;
      max-height: 300px;
      margin: 0 auto;
    }
  }
`
