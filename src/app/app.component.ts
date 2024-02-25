import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';
  board: (string | null)[][];
  currentPlayer: string = 'X';
  winner: string = 'None';

  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.currentPlayer = 'X';
    this.winner = 'None';
  }

  move(row: number, col: number) {
    if (!this.board[row][col] && this.winner === 'None') {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWin()) {
        this.winner = this.currentPlayer;
      }
      else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWin(): boolean {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] != null &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]) {
        return true;
      }
      if (this.board[0][i] != null &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]) {
        return true;
      }
    }
    if (this.board[0][0] != null &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]) {
      return true;
    }
    if (this.board[0][2] != null &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]) {
      return true;
    }
    return false;
  }
}
