import { TPiece } from "../types/piece.types";
import Piece from "./piece.class";

class DevPiece extends Piece {

  constructor(xPos: number, yPos: number, color: 'white' | 'black') {
    super(xPos, yPos, 'dev', color)
  }

  override getValidMoves(): number[][] {
    return [
      // right possible positions
      [this.xPosition + 1, this.yPosition],
      [this.xPosition + 2, this.yPosition],
      [this.xPosition + 3, this.yPosition],
  
      // left possible positions
      [this.xPosition - 1, this.yPosition],
      [this.xPosition - 2, this.yPosition],
      [this.xPosition - 3, this.yPosition],
  
      // top possible positions
      [this.xPosition, this.yPosition + 1],
      [this.xPosition, this.yPosition + 2],
      [this.xPosition, this.yPosition + 3],
  
      // bottom possible positions
      [this.xPosition, this.yPosition - 1],
      [this.xPosition, this.yPosition - 2],
      [this.xPosition, this.yPosition - 3],
  
      // diagonal top-right
      [this.xPosition + 1, this.yPosition + 1],
      [this.xPosition + 2, this.yPosition + 2],
      [this.xPosition + 3, this.yPosition + 3],
  
      // diagonal top-left
      [this.xPosition - 1, this.yPosition + 1],
      [this.xPosition - 2, this.yPosition + 2],
      [this.xPosition - 3, this.yPosition + 3],
  
      // diagonal bottom-right
      [this.xPosition + 1, this.yPosition - 1],
      [this.xPosition + 2, this.yPosition - 2],
      [this.xPosition + 3, this.yPosition - 3],
  
      // diagonal bottom-left
      [this.xPosition - 1, this.yPosition - 1],
      [this.xPosition - 2, this.yPosition - 2],
      [this.xPosition - 3, this.yPosition - 3],
    ];
  }
  
}

export default DevPiece