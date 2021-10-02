import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { renderer } from './renderer'

export const WaveFrame = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasEl.current) {
      renderer(canvasEl.current)
    }
  }, [canvasEl])

  return <Canvas ref={canvasEl} />
}

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`
