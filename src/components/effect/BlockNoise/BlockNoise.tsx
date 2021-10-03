import React, { VFC, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { renderer } from './renderer'

export const BlockNoise: VFC = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasEl.current) {
      renderer(canvasEl.current)
    }
  }, [canvasEl])

  return <Canvas ref={canvasEl} />
}

const Canvas = styled.canvas`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
