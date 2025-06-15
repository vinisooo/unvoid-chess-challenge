import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TCell } from '../../types/board.types';
import PoPiece from '../../classes/piece-po.class';
import DevPiece from '../../classes/piece-dev.class';
import DesignerPiece from '../../classes/piece-designer.class';
import Piece from '../../classes/piece.class';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  imports: [CommonModule],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss',
  standalone: true,
  host: { ngSkipHydration: '' },
})
export class ChessBoardComponent implements OnInit, OnChanges {
  @Input() xAxisDimension: number = 6
  @Input() yAxisDimension: number = 6

  protected matrix: TCell[][] = []
  selectedPiece: Piece | null = null
  protected currentPlayer: 'white' | 'black' = 'white'

  @Output() finishGame = new EventEmitter<'white' | 'black'>()

  ngOnInit(): void {
    this.createMatrix()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createMatrix()
  }

  createMatrix() {
    if(this.xAxisDimension < 6 || this.yAxisDimension < 6) {
      throw new Error('The matrix must have at least 6x6 dimensions')
    } else if(this.xAxisDimension > 12 || this.yAxisDimension > 12) {
      throw new Error('The matrix must have at most 12x12 dimensions')
    }
    this.matrix = []

    this.matrix = Array.from({ length: this.yAxisDimension }, () =>
      Array.from({ length: this.xAxisDimension }, () => ({ moveable: false, piece: null }))
    )
    this.setWhitePieces()
    this.setBlackPieces()
  }

  setWhitePieces() {
    this.matrix[0][0] = { moveable: false, piece: new PoPiece(0, 0, 'white')}
    this.matrix[0][1] = { moveable: false, piece: new DevPiece(1, 0, 'white')}
    this.matrix[0][2] = { moveable: false, piece: new DesignerPiece(2, 0, 'white')}
  }

  setBlackPieces() {
    const lastRowIndex = this.yAxisDimension - 1;
    const lastColIndex = this.xAxisDimension - 1;
  
    this.matrix[lastRowIndex][lastColIndex] = { moveable: false, piece: new PoPiece(lastColIndex, lastRowIndex, 'black') };
    this.matrix[lastRowIndex][lastColIndex - 1] = { moveable: false, piece: new DevPiece(lastColIndex - 1, lastRowIndex, 'black') };
    this.matrix[lastRowIndex][lastColIndex - 2] = { moveable: false, piece: new DesignerPiece(lastColIndex - 2, lastRowIndex, 'black') };
  }  


  // Used to reverse the matrix for display purposes
  protected getReversedMatrix(): (TCell | null)[][] {
    return [...this.matrix].reverse()
  }


  protected isCellSelectable(yPos: number, xPos: number): boolean {
    const moveableCells = this.selectedPiece?.getValidMoves()

    if(!moveableCells || !moveableCells.length) {
      return false
    }

    return moveableCells?.some(cellCoordinate => {
      return cellCoordinate[0] === xPos && cellCoordinate[1] === yPos
        && this.matrix[cellCoordinate[1]][cellCoordinate[0]].piece?.color !== this.selectedPiece?.color
    })
  }

  private selectPiece(piece: Piece | null): void {
    this.selectedPiece = piece
  }

  private movePiece(yPos: number, xPos: number): void {
    if (this.selectedPiece?.color !== this.currentPlayer) {
      return
    }

    if (!this.selectedPiece) {
      return;
    }
  
    this.matrix[this.selectedPiece.yPosition][this.selectedPiece.xPosition].piece = null;
    this.selectedPiece.yPosition = yPos;
    this.selectedPiece.xPosition = xPos;
    this.matrix[yPos][xPos].piece = this.selectedPiece;

    this.selectedPiece = null;
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white'
  }

  private getWinner(): 'black' | 'white' | null {
    const hasWhite = this.matrix.some(row => 
      row.some(cell => cell.piece?.color === 'white')
    );
  
    const hasBlack = this.matrix.some(row => 
      row.some(cell => cell.piece?.color === 'black')
    );
  
    if (!hasBlack && hasWhite) {
      return 'white';
    }
    if (!hasWhite && hasBlack) {
      return 'black'; 
    }
    
    return null;
  }
  

  protected handleCellClick(yPos: number, xPos: number): void {
    const cell = this.matrix[yPos][xPos];
    if (cell.piece && cell.piece.color === this.currentPlayer) {
      this.selectPiece(cell.piece);
    } else if (this.selectedPiece && this.isCellSelectable(yPos, xPos)) {
      this.movePiece(yPos, xPos);
    }

    const winner = this.getWinner()
    if(winner) {
      this.finishGame.emit(winner)
      this.createMatrix()
    }
  }
}
