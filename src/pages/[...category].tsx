import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { VFC } from 'react'

import { Content, SiteMapItem, getAllContents, getContent, getSiteMap } from '../libs/content'

import { Head } from '../components/model/Head'
import { Post } from '../components/model/Post'

type Props = {
  siteMap: SiteMapItem[]
  content: Content
}

const Page: VFC<Props> = ({ siteMap, content }) => {
  const router = useRouter()
  const category = router.query.category

  let isCategoryTopPage = false
  let categoryName = ''

  if (category && Array.isArray(category)) {
    isCategoryTopPage = category.length === 1
    categoryName = siteMap.find((item) => item.path === `/${category[0]}`)?.name ?? ''
  }

  return (
    <>
      <Head title={content.title} description={content.description} />
      <Post content={content} categoryName={categoryName} siteMap={siteMap} isCategoryTopPage={isCategoryTopPage} />
    </>
  )
}

export default Page

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllContents()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const siteMap = getSiteMap()

  if (!params || !params.category || !Array.isArray(params.category)) {
    return {
      props: {
        siteMap,
        content: {
          title: '',
          description: '',
          contentHtml: '',
        },
      },
    }
  }

  const category = `/${params.category.join('/')}`
  const content = await getContent(category)

  return {
    props: {
      siteMap,
      content,
    },
  }
}
