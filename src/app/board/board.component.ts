import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares!: any[];
  xIsNext: boolean = true;
  winner!: string;
  scoreX = 0;
  scoreO = 0;
  updatedFlag: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  /**
   * Starts a new game
   * fills array with null values & resets flags
   * called by the "new game" button
   */
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
    this.updatedFlag = false;
  }

  /**
   * Resets score of both players to 0 and starts new game
   * called by the "reset score" button
   */
  resetScore() {
    this.scoreO = 0;
    this.scoreX = 0;
    this.newGame();
  }

  /**
   * Checks which player is next, X is first
   */
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  /**
   * Selects a square from the grid
   * @param idx index of the location on grid
   * checks for winner and updates score after every move
   */
  makeMove(idx: number) {
    if (!this.squares[idx] && this.winner === null) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
    this.updateScore();
  }

  /**
   * Updates score when round winner is determined
   */
  updateScore() {
    if (this.winner != null && !this.updatedFlag) {
      this.winner === 'X' ? this.scoreX++ : this.scoreO++;
      this.updatedFlag = true;
    }
  }

  /**
   * Checks for 3 sequential selections in grid by searching
   * through possible winning configurations
   * @returns successful match of 3 in a row
   */
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

}
