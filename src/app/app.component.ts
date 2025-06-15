import { Component } from '@angular/core';
import { ChessBoardComponent } from './components/chess-board/chess-board.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ChessBoardComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular';

  xAxisDimension: number = 6
  yAxisDimension: number = 6

  isGameRunning: boolean = false

  onGameFinish (winner: 'white' | 'black') {
    this.isGameRunning = false
    alert(`The ${winner} player wins!`)
  }
}
