import React, { useState } from 'react'

import { SiteMapItem } from '../../libs/content'

import { NavigationButton } from './NavigationButton'
import { Elements } from './Elements'

const PHASE2_END_TIME = 4000
const PHASE3_START_TIME = 3000

export const useSpNavigation = (siteMap: SiteMapItem[]) => {
  const [visible, setVisible] = useState(false)
  const [phase1Flag, setPhase1Flag] = useState(false)
  const [phase2Flag, setPhase2Flag] = useState(false)
  const [phase3Flag, setPhase3Flag] = useState(false)

  const handleClickNavigationButton = () => {
    setPhase1Flag(true)
    setPhase2Flag(true)

    setTimeout(() => {
      setPhase3Flag(true)
    }, PHASE3_START_TIME)

    setTimeout(() => {
      setPhase2Flag(false)
      setVisible(true)
    }, PHASE2_END_TIME)
  }
  const handleClickCloseMenuButton = () => {
    setPhase1Flag(false)
    setPhase3Flag(false)
    setVisible(false)
  }

  return {
    isClicked: phase1Flag,
    navigationButton: <NavigationButton onClick={handleClickNavigationButton} />,
    elements: (
      <Elements
        siteMap={siteMap}
        visible={visible}
        phase2Flag={phase2Flag}
        phase3Flag={phase3Flag}
        onClickClose={handleClickCloseMenuButton}
      />
    ),
  }
}
