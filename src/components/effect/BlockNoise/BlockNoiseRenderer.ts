import { getRandomNum } from '../../../libs/number'

const MIN_BLOCK_SIZE = 10
const colorArray = ['#FDFCFD', '#E53AF7', '#E64161', '#FDFF80', '#1520F3', '#73F9FD', '#71F86A', '#5A50A4']

export class BlockNoiseRenderer {
  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    const top = getRandomNum(0, canvasHeight - MIN_BLOCK_SIZE)
    const left = getRandomNum(0, canvasWidth - MIN_BLOCK_SIZE)
    const width = getRandomNum(MIN_BLOCK_SIZE, canvasWidth - left)
    const height = Math.min(getRandomNum(MIN_BLOCK_SIZE, width), getRandomNum(MIN_BLOCK_SIZE, canvasWidth - top))
    const color = colorArray[getRandomNum(0, colorArray.length - 1)]

    ctx.fillStyle = color
    ctx.fillRect(left, top, width, height)
  }
}
