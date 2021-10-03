import React, { VFC } from 'react'
import styled from 'styled-components'

import { SiteMapItem } from '../../libs/content'

import { BlockNoise } from '../../components/effect/BlockNoise'
import { NavigationLayer } from './NavigationLayer'

type Props = {
  siteMap: SiteMapItem[]
  visible: boolean
  phase2Flag: boolean
  phase3Flag: boolean
  onClickClose: () => void
}

export const Elements: VFC<Props> = ({ siteMap, visible, phase2Flag, phase3Flag, onClickClose }) => (
  <>
    {phase2Flag && <BlockNoise />}
    {phase3Flag && <SandStorm />}
    {visible && <NavigationLayer siteMap={siteMap} visible={visible} onClickClose={onClickClose} />}
  </>
)

const SandStorm = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(/images/sandstorm.gif) repeat;
`
