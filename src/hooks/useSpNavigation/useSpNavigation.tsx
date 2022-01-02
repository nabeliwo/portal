import React, { useState } from 'react'

import { SiteMapItem } from '../../libs/content'

import { NavigationButton } from './NavigationButton'
import { Elements } from './Elements'

const VISIBLE_TIME = 800
const END_TIME = 500

export const useSpNavigation = (siteMap: SiteMapItem[]) => {
  const [visible, setVisible] = useState(false)
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)

  const handleClickNavigationButton = () => {
    setStarted(true)
    setEnded(false)

    setTimeout(() => {
      setVisible(true)
    }, VISIBLE_TIME)
  }
  const handleClickCloseMenuButton = () => {
    setEnded(true)
    setVisible(false)

    setTimeout(() => {
      setStarted(false)
    }, END_TIME)
  }

  return {
    navigationButton: <NavigationButton onClick={handleClickNavigationButton} />,
    elements: (
      <Elements siteMap={siteMap} started={started} ended={ended} visible={visible} onClickClose={handleClickCloseMenuButton} />
    ),
  }
}
