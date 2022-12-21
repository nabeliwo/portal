import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { VFC } from 'react'
import styled, { keyframes } from 'styled-components'

import { service } from '../../../constants/application'
import { color, media } from '../../../constants/theme'

type Props = {
  simpleMode: boolean
}

export const SiteTitle: VFC<Props> = ({ simpleMode }) => {
  const router = useRouter()
  const topPagePath = '/'
  const isTopPage = router.pathname === topPagePath

  const title = (
    <TitleWrapper>
      <Title>{service.siteName}</Title>
      {!simpleMode && <Cursor />}
    </TitleWrapper>
  )

  if (isTopPage) {
    return <h1>{title}</h1>
  }

  return (
    <p>
      <Link href={topPagePath} passHref legacyBehavior>
        <Anchor>{title}</Anchor>
      </Link>
    </p>
  )
}

const WIDE_MEDIA_FONT_SIZE = 40
const NARROW_MEDIA_FONT_SIZE = 30
const CURSOR_FLASH_TIME = 1.6
const flash = keyframes`
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`

const TitleWrapper = styled.span`
  display: flex;
  align-items: center;
`
const Title = styled.span`
  font-size: ${NARROW_MEDIA_FONT_SIZE}px;
  line-height: 1;
  letter-spacing: 5px;

  @media screen and (min-width: ${media.BREAK_POINT + 1}px) {
    font-size: ${WIDE_MEDIA_FONT_SIZE}px;
  }
`
const Cursor = styled.span`
  display: inline-block;
  width: 4px;
  height: ${NARROW_MEDIA_FONT_SIZE}px;
  margin-left: 5px;
  background-color: ${color.BLUE};
  animation: ${flash} ${CURSOR_FLASH_TIME}s infinite;

  @media screen and (min-width: ${media.BREAK_POINT + 1}px) {
    height: ${WIDE_MEDIA_FONT_SIZE}px;
  }
`
const Anchor = styled.a`
  &:hover {
    text-decoration: underline;
  }
`
