import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'

import { getSiteMap } from '../libs/content'

import { Head } from '../components/model/Head'

const NotFound = () => {
  // TODO: 見た目作る

  return (
    <>
      <Head title="404 Not Found" noIndex />
      hoge
    </>
  )
}

export default NotFound

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const siteMap = getSiteMap()

  return {
    props: {
      siteMap,
    },
  }
}
