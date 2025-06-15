import { TPiece } from "../types/piece.types"

class Piece {
  yPosition: number = 1
  xPosition: number = 1

  type: TPiece = 'dev'
  color: 'white' | 'black' = 'white'

  constructor(xPos: number, yPos: number, type: TPiece, color: 'white' | 'black') {
    this.xPosition = xPos
    this.yPosition = yPos
    this.type = type
    this.color = color
  }


  getValidMoves(): number[][] {
    return []
  }

  getImage(): string {
    if(!this.color || !this.type) {
      throw new Error('Piece must have a color and a type')
    }
    return `/${this.type}-${this.color}.png`
  }
}

export default Piece