import { BlockNoiseRenderer } from './BlockNoiseRenderer'

export const renderer = (canvas: HTMLCanvasElement) => {
  const dpr = typeof window !== 'undefined' ? devicePixelRatio : 1
  const ctx = canvas.getContext('2d')

  let canvasWidth = 0
  let canvasHeight = 0
  let timerId = 0

  const blockNoiseRenderer = new BlockNoiseRenderer()

  const handleResize = () => {
    canvasWidth = innerWidth * dpr
    canvasHeight = innerHeight * dpr
    canvas.width = canvasWidth
    canvas.height = canvasHeight
  }

  const tick = () => {
    render()
    timerId = window.setTimeout(() => tick(), 1000 / 60) // 60FPS
  }

  const render = () => {
    if (!ctx) return

    blockNoiseRenderer.draw(ctx, canvasWidth, canvasHeight)
  }

  window.addEventListener('resize', handleResize)

  handleResize()
  tick()

  return () => {
    clearTimeout(timerId)
  }
}
