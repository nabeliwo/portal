import { color, space } from '../../../constants/theme'
import { getRandomNum } from '../../../libs/number'

type ActionType = 'weakShake' | 'strongShake' | 'noise'
type Position = {
  x: number
  y: number
}
type LineDirection = 'horizontal' | 'vertical'

const actionType = {
  weakShake: 'weakShake',
  strongShake: 'strongShake',
  noise: 'noise',
} as const
const lineDirectionType = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const

const dpr = typeof window !== 'undefined' ? devicePixelRatio : 1
const stepSize = 5 * dpr
const lineWidth = 1 * dpr
const weakShakeRunoutWidth = 5 * dpr
const weakShakeFrameBuffer = 10
const strongShakeRunoutWidth = space.M * dpr
const strongShakeFrameBuffer = 20
const minNoiseSize = 150 * dpr
const endNoiseFrame = space.M * dpr

export class WaveLineRenderer {
  nextWeakShakeFrame = 0
  weakShakeFlag = false
  nextStrongShakeFrame = 0
  strongShakeFlag = false
  nextNoiseFrame = 0
  noiseFlag = false
  noiseSize = 0
  noiseStartPoint = 0

  constructor() {
    this.nextWeakShakeFrame = this.getNextActionFrame(actionType.weakShake, 0)
    this.nextStrongShakeFrame = this.getNextActionFrame(actionType.strongShake, 0)
    this.nextNoiseFrame = this.getNextActionFrame(actionType.noise, 0)
  }

  getNextActionFrame(type: ActionType, currentFrame: number) {
    let randomNum = 0

    if (type === actionType.weakShake) {
      randomNum = getRandomNum(100, 400)
    } else if (type === actionType.strongShake) {
      randomNum = getRandomNum(600, 1000)
    } else if (type === actionType.noise) {
      randomNum = getRandomNum(300, 600)
    }

    return currentFrame + randomNum
  }

  draw(ctx: CanvasRenderingContext2D, startPosition: Position, endPosition: Position, frame: number, canvasSize: number) {
    if (startPosition.x !== endPosition.x && startPosition.y !== endPosition.y) {
      throw new Error('"draw" only supports straight lines.')
    }

    const lineDirection = startPosition.x === endPosition.x ? lineDirectionType.vertical : lineDirectionType.horizontal
    let baseLine: number = 0
    let noiseArray: Position[] = []

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color.BLUE

    if (lineDirection === lineDirectionType.horizontal) {
      baseLine = this.getWeakShakeLine(frame, startPosition.y)
      baseLine = this.getStrongShakeLine(frame, baseLine)
      ctx.moveTo(startPosition.x, baseLine)
      noiseArray = this.getNoiseArray(frame, startPosition.x, endPosition.x, baseLine, lineDirection, canvasSize)
    } else if (lineDirection === lineDirectionType.vertical) {
      baseLine = this.getWeakShakeLine(frame, startPosition.x)
      baseLine = this.getStrongShakeLine(frame, baseLine)
      ctx.moveTo(baseLine, startPosition.y)
      noiseArray = this.getNoiseArray(frame, startPosition.y, endPosition.y, baseLine, lineDirection, canvasSize)
    }

    if (noiseArray.length > 0) {
      const firstPosition = noiseArray[0]
      const lastPosition = noiseArray[noiseArray.length - 1]

      if (lineDirection === lineDirectionType.horizontal) {
        ctx.lineTo(firstPosition.x - stepSize, baseLine)

        noiseArray.forEach(({ x, y }) => {
          ctx.lineTo(x, y)
        })

        ctx.lineTo(lastPosition.x + stepSize, baseLine)
      } else if (lineDirection === lineDirectionType.vertical) {
        ctx.lineTo(baseLine, firstPosition.y - stepSize)

        noiseArray.forEach(({ x, y }) => {
          ctx.lineTo(x, y)
        })

        ctx.lineTo(baseLine, lastPosition.y + stepSize)
      }
    }

    if (lineDirection === lineDirectionType.horizontal) {
      ctx.lineTo(endPosition.x, baseLine)
    } else if (lineDirection === lineDirectionType.vertical) {
      ctx.lineTo(baseLine, endPosition.y)
    }

    ctx.stroke()
  }

  getWeakShakeLine(frame: number, position: number) {
    if (frame >= this.nextWeakShakeFrame) {
      this.weakShakeFlag = true
    }

    if (this.weakShakeFlag) {
      position = getRandomNum(position - weakShakeRunoutWidth, position + weakShakeRunoutWidth)
    }

    if (frame >= this.nextWeakShakeFrame + weakShakeFrameBuffer) {
      this.weakShakeFlag = false
      this.nextWeakShakeFrame = this.getNextActionFrame(actionType.weakShake, frame)
    }

    return position
  }

  getStrongShakeLine(frame: number, position: number) {
    if (frame >= this.nextStrongShakeFrame) {
      this.strongShakeFlag = true
    }

    if (this.strongShakeFlag) {
      position = getRandomNum(position - strongShakeRunoutWidth, position + strongShakeRunoutWidth)
    }

    if (frame >= this.nextStrongShakeFrame + strongShakeFrameBuffer) {
      this.strongShakeFlag = false
      this.nextStrongShakeFrame = this.getNextActionFrame(actionType.strongShake, frame)
    }

    return position
  }

  getNoiseArray(
    frame: number,
    startPoint: number,
    endPoint: number,
    baseLine: number,
    lineDirection: LineDirection,
    canvasSize: number,
  ) {
    const noiseArray: Position[] = []

    if (frame >= this.nextNoiseFrame) {
      if (!this.noiseFlag) {
        this.noiseSize = getRandomNum(minNoiseSize, canvasSize - startPoint - (canvasSize - endPoint) - stepSize * 2)
        this.noiseStartPoint = getRandomNum(startPoint + stepSize, endPoint - stepSize - this.noiseSize)
        this.noiseFlag = true
      }
    }

    if (this.noiseFlag) {
      let jaggyFlag = true

      for (let i = this.noiseStartPoint; i <= this.noiseStartPoint + this.noiseSize; i += stepSize) {
        const remainFrame = this.nextNoiseFrame + endNoiseFrame - frame
        let position = baseLine

        if (jaggyFlag) {
          jaggyFlag = false
          position = getRandomNum(baseLine, baseLine + remainFrame)
        } else {
          jaggyFlag = true
          position = getRandomNum(baseLine - remainFrame, baseLine)
        }

        if (lineDirection === lineDirectionType.horizontal) {
          noiseArray.push({ x: i, y: position })
        } else if (lineDirection === lineDirectionType.vertical) {
          noiseArray.push({ x: position, y: i })
        }
      }
    }

    if (frame >= this.nextNoiseFrame + endNoiseFrame) {
      this.noiseFlag = false
      this.nextNoiseFrame = this.getNextActionFrame('noise', frame)
    }

    return noiseArray
  }
}
