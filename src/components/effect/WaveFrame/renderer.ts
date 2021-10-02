import { color, media, space } from '../../../constants/theme'
import { WaveLineRenderer } from './WaveLineRenderer'

const MAX_FRAME = 100000

export const renderer = (canvas: HTMLCanvasElement) => {
  const dpr = typeof window !== 'undefined' ? devicePixelRatio : 1
  const ctx = canvas.getContext('2d')

  let canvasWidth = 0
  let canvasHeight = 0
  let frame = 0
  let aroundMargin = 0

  const topNoiseLine = new WaveLineRenderer()
  const rightNoiseLine = new WaveLineRenderer()
  const bottomNoiseLine = new WaveLineRenderer()
  const leftNoiseLine = new WaveLineRenderer()

  const handleResize = () => {
    canvasWidth = innerWidth * dpr
    canvasHeight = innerHeight * dpr
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    aroundMargin = (media.isWide() ? space.M : space.XS) * dpr
  }

  const tick = () => {
    render()
    setTimeout(() => tick(), 1000 / 60) // 60FPS
  }

  const clearCanvas = () => {
    if (!ctx) return

    ctx.fillStyle = color.BLACK
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.beginPath()
  }

  const frameCountUp = () => {
    frame++
    if (frame >= MAX_FRAME) frame = 0
  }

  const render = () => {
    if (!ctx) return

    clearCanvas()

    const leftTop = { x: aroundMargin, y: aroundMargin }
    const rightTop = { x: canvasWidth - aroundMargin, y: aroundMargin }
    const rightBottom = { x: canvasWidth - aroundMargin, y: canvasHeight - aroundMargin }
    const leftBottom = { x: aroundMargin, y: canvasHeight - aroundMargin }

    if (media.isWide()) {
      topNoiseLine.draw(ctx, leftTop, rightTop, frame, canvasWidth)
      bottomNoiseLine.draw(ctx, leftBottom, rightBottom, frame, canvasWidth)
    }

    rightNoiseLine.draw(ctx, rightTop, rightBottom, frame, canvasHeight)
    leftNoiseLine.draw(ctx, leftTop, leftBottom, frame, canvasHeight)

    frameCountUp()
  }

  window.addEventListener('resize', handleResize)

  handleResize()
  tick()
}
