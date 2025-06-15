import { TPiece } from "../types/piece.types";
import Piece from "./piece.class";

class PoPiece extends Piece {

  constructor(xPos: number, yPos: number, color: 'white' | 'black') {
    super(xPos, yPos, 'po', color)
  }

  override getValidMoves(): number[][] {
    return [
      // right
      [this.xPosition + 1, this.yPosition],

      // left
      [this.xPosition - 1, this.yPosition],

      // top
      [this.xPosition, this.yPosition + 1],

      // bottom
      [this.xPosition, this.yPosition - 1],

      // diagonal top-left
      [this.xPosition + 1, this.yPosition + 1],

      // diagonal bottom-right
      [this.xPosition + 1, this.yPosition - 1],

      // diagonal bottom-left
      [this.xPosition - 1, this.yPosition - 1],
    ]
  }
}

export default PoPiece