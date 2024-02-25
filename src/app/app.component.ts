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
  board: (string | null)[][] = [];
  currentPlayer: string = 'X';
  winner: string = 'None';
  boardSize: number = 9;

  constructor() {
    this.initializeBoard(this.boardSize);
  }

  ngOnInit(): void {
    this.reset();
  }

  initializeBoard(size: number) {
    this.board = [];
    for (let i = 0; i < size; i++) {
      this.board[i] = [];
      for (let j = 0; j < size; j++) {
        this.board[i][j] = null;
      }
    }
  }

  reset() {
    this.initializeBoard(this.boardSize);
    this.currentPlayer = 'X';
    this.winner = 'None';
  }

  move(row: number, col: number) {
    if (!this.board[row][col] && this.winner === 'None') {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWhoWin('X') || this.checkWhoWin('O')) {
        this.winner = this.currentPlayer;
      }
      else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWhoWin(player: string): boolean {
    let won = false;
    for (let i = 0; i < this.boardSize; i++) {
      won = false;
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j] != null && this.board[i][j] === player) {
          won = true;
        }
        else {
          won = false;
          break;
        }
      }
      if (won) {
        return true;
      }
    }

    for (let i = 0; i < this.boardSize; i++) {
      won = false;
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[j][i] != null && this.board[j][i] === player) {
          won = true;
        }
        else {
          won = false;
          break;
        }
      }
      if (won) {
        return true;
      }
    }

    for (let i = 0; i < this.boardSize; i++) {
      won = false;
      if (this.board[i][i] != null && this.board[i][i] === player) {
        won = true;
      }
      else {
        won = false;
        break;
      }
    }
    if (won) {
      return true;
    }

    for (let i = 0; i < this.boardSize; i++) {
      won = false;
      if (this.board[i][this.boardSize - 1 - i] != null && this.board[i][this.boardSize - 1 - i] === player) {
        won = true;
      }
      else {
        won = false;
        break;
      }
    }
    if (won) {
      return true;
    }

    return false;
  }
}
