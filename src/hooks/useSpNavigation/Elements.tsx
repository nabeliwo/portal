import React, { VFC } from 'react'
import styled from 'styled-components'

import { SiteMapItem } from '../../libs/content'

import { NavigationLayer } from './NavigationLayer'

type Props = {
  simpleMode: boolean
  siteMap: SiteMapItem[]
  started: boolean
  ended: boolean
  visible: boolean
  onClickClose: () => void
}

export const Elements: VFC<Props> = ({ simpleMode, siteMap, visible, started, ended, onClickClose }) => {
  const sansStormClass = `${started ? 'started' : ''} ${ended ? 'ended' : ''}`

  return (
    <>
      <SandStorm className={sansStormClass} />
      {visible && <NavigationLayer simpleMode={simpleMode} siteMap={siteMap} visible={visible} onClickClose={onClickClose} />}
    </>
  )
}

const SandStorm = styled.div`
  visibility: hidden;
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 2%;
  height: 10%;
  margin: auto;
  background: url(/images/sandstorm.gif) repeat;
  transition: width 0.3s 0.2s, height 0.2s;

  &.started {
    visibility: visible;
    width: 100%;
    height: 100%;
  }

  &.started.ended {
    width: 0%;
    height: 0%;
  }
`
