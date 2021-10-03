import { GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { VFXImg, VFXProvider } from 'react-vfx'
import styled from 'styled-components'

import { getSiteMap } from '../libs/content'
import { media } from '../constants/theme'

import { Head } from '../components/model/Head'

const NotFound = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (media.isWide()) {
      setMounted(true)
    }
  }, [])

  return (
    <>
      <Head title="404 Not Found" noIndex />

      <Wrapper>
        {mounted ? (
          <VFXProvider>
            <VFXImg src="/images/404.png" shader="glitch" width="410" height="486" alt="404 Not Found" />
          </VFXProvider>
        ) : (
          <img src="/images/404.png" width="410" height="486" alt="404 Not Found" />
        )}
      </Wrapper>
    </>
  )
}

export default NotFound

export const getStaticProps: GetStaticProps = async () => {
  const siteMap = getSiteMap()

  return {
    props: {
      siteMap,
    },
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
