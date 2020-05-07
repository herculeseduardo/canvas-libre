const lineWidth = 10

const drawCircle = ({ ctx, x, y, rad, sAng, eAng, color = 'blue' }) => {
  ctx.beginPath()
  ctx.arc(x, y, rad, sAng, eAng * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}

const drawLine = ({ ctx, moveX, moveY, lineX, lineY, color }) => {
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.moveTo(moveX, moveY)
  ctx.lineTo(lineX, lineY)
  ctx.strokeStyle = color
  ctx.stroke()
  ctx.closePath()
}

const generateId = () => Date.now().toString()

class Canvas {
  constructor ({ ctx, startX = 0, startY = 0, color = 'black', user }) {
    this.ctx = ctx
    this.moveX = startX
    this.moveY = startY
    this.lineX = 0
    this.lineY = 0
    this.color = color
    this.user = user || `anonymous_${generateId()}`
  }

  draw ({ edges }) {
    edges.map(edge => {
      this.lineX = edge[0]
      this.lineY = edge[1]
      drawLine({
        ctx: this.ctx,
        moveX: this.moveX,
        moveY: this.moveY,
        lineX: this.lineX,
        lineY: this.lineY,
        color: this.color
      })
      this.moveX = this.lineX
      this.moveY = this.lineY
    })
    return this
  }

  toString () {
    console.log(this.user)
    return this.user
  }
}

const buildCanvasLibre = obj => {
  const c = document.getElementById('canvasLibre')
  const ctx = c.getContext('2d')

  obj.data.map(item => {
    new Canvas({
      ctx,
      color: item.color,
      user: item.user
    })
      .draw({
        edges: item.edges
      })
      .toString()
  })
}