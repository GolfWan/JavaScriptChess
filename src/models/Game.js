import { Board } from './Board.js';
import { Pawn } from './Pawn.js';
import { Rook } from './Rook.js';
import { Knight } from './Knight.js';
import { Bishop } from './Bishop.js';
import { Queen } from './Queen.js';
import { King } from './King.js';
export class Game {
    constructor() {
        this.board = new Board()
        this.initializeBoard();
    }

    initializeBoard() {
        for (let x = 0; x <= 7; x++) {
            let pawnWhite = new Pawn('white');
            this.board.setSquare(1, x, pawnWhite);
            let pawnBlack = new Pawn('black');
            this.board.setSquare(6, x, pawnBlack);

        }
        for (let x = 0; x <= 7; x++) {
            if (x == 0 || x == 7) {
                let rookWhite = new Rook('white');
                this.board.setSquare(0, x, rookWhite);
                let rookBlack = new Rook('black');
                this.board.setSquare(7, x, rookBlack);
            }
            if (x == 1 || x == 6) {
                let knightWhite = new Knight('white');
                this.board.setSquare(0, x, knightWhite);
                let knightBlack = new Knight('black');
                this.board.setSquare(7, x, knightBlack);
            }
            if (x == 2 || x == 5) {
                let bishopWhite = new Bishop('white');
                this.board.setSquare(0, x, bishopWhite);
                let bishopBlack = new Bishop('black');
                this.board.setSquare(7, x, bishopBlack);
            }
            if (x == 3) {
                let queenWhite = new Queen('white');
                this.board.setSquare(0, x, queenWhite);
                let queenBlack = new Queen('black');
                this.board.setSquare(7, x, queenBlack);
            }
            if (x == 4) {
                let kingWhite = new King('white');
                this.board.setSquare(0, x, kingWhite);
                let kingBlack = new King('black');
                this.board.setSquare(7, x, kingBlack);
            }
        }
    }
}