import { TPiece } from "../types/piece.types";
import Piece from "./piece.class";

class DesignerPiece extends Piece {

  constructor(xPos: number, yPos: number, color: 'white' | 'black') {
    super(xPos, yPos, 'designer', color)
  }

  override getValidMoves(): number[][] {
    return [
      [this.xPosition + 2, this.yPosition + 1],
      [this.xPosition + 2, this.yPosition - 1],
      [this.xPosition - 2, this.yPosition + 1],
      [this.xPosition - 2, this.yPosition - 1],
      [this.xPosition + 1, this.yPosition + 2],
      [this.xPosition + 1, this.yPosition - 2],
      [this.xPosition - 1, this.yPosition + 2],
      [this.xPosition - 1, this.yPosition - 2],
    ];
  }
}

export default DesignerPiece