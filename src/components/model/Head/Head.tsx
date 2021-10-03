import React, { VFC } from 'react'
import NextHead from 'next/head'

import { service } from '../../../constants/application'

type Props = {
  title?: string
  description?: string
  noIndex?: boolean
}

export const Head: VFC<Props> = ({ title, description, noIndex = false }) => {
  const siteTitle = title ? `${title} | ${service.siteName}` : service.siteName
  const siteDescription = description ? description : service.description
  const image = `${service.url}/images/logo.png`

  return (
    <NextHead>
      {noIndex && <meta name="robots" key="robots" content="noindex" />}

      <meta name="description" key="description" content={siteDescription} />
      <meta name="image" key="image" content={image} />
      <meta name="og:url" key="og:url" content={service.url} />
      <meta name="og:site_name" key="og:site_name" content={service.siteName} />
      <meta name="og:type" key="og:type" content="website" />
      <meta name="og:title" key="og:title" content={siteTitle} />
      <meta name="og:description" key="og:description" content={siteDescription} />
      <meta name="og:image" key="og:image" content={image} />
      <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" key="twitter:creator" content="nabeliwo" />
      <meta name="twitter:title" key="twitter:title" content={siteTitle} />
      <meta name="twitter:description" key="twitter:description" content={siteDescription} />
      <meta name="twitter:image" key="twitter:image" content={image} />
      <title>{siteTitle}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </NextHead>
  )
}
