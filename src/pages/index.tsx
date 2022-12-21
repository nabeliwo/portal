import { GetStaticProps } from 'next'
import React, { VFC } from 'react'

import { Head } from '../components/model/Head'
import { Post } from '../components/model/Post'
import { Content, getContent, getSiteMap } from '../libs/content'

type Props = {
  content: Content
}

const Home: VFC<Props> = ({ content }) => {
  return (
    <>
      <Head />
      <Post content={content} isTopPage />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const siteMap = getSiteMap()
  const topPagePath = '/'
  const content = await getContent(topPagePath)

  return {
    props: {
      siteMap,
      content,
    },
  }
}
