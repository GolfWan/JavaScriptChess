import { BoardView } from '../views/BoardView.js';
import { Game } from '../models/Game.js';

let frontendBoard = document.getElementById('chessBoard');
export class GameController {
    constructor() {
        this.selectedPiece = null;
        this.selectedPosition = null;
        this.game = new Game();
        this.boardView = new BoardView(frontendBoard);
        this.boardView.render(this.game.board);
        this.addEventListener();
    }
    handleClick(row, col) {
        if (this.selectedPiece == null) {
            if (this.game.board.getSquare(row, col) != null && this.game.board.getSquare(row, col).color == this.game.currentPlayer) {
                this.selectedPosition = { row, col };
                this.selectedPiece = this.game.board.getSquare(row, col);
            }
        } else {
            if (this.selectedPiece == this.game.board.getSquare(row, col)) {
                this.selectedPosition = null;
                this.selectedPiece = null;
            } else if (this.game.board.getSquare(row, col) != null && this.game.board.getSquare(row, col).color == this.game.currentPlayer) {
                this.selectedPosition = { row, col };
                this.selectedPiece = this.game.board.getSquare(row, col);
            } else {
                this.game.checkMove(this.selectedPosition.row, this.selectedPosition.col, row, col);
                if (this.game.isCheckmate(this.game.currentPlayer)) {
                    alert("Schachmatt");
                }
                if (this.game.isPatt(this.game.currentPlayer)) {
                    alert("Patt");
                }
                this.selectedPiece = null;
                this.selectedPosition = null;
                this.boardView.render(this.game.board);
                this.addEventListener();
            }
        }
    }

    addEventListener() {
        document.querySelectorAll(".square").forEach(square => {
            square.addEventListener('click', () => {
                let row = parseInt(square.dataset.row);
                let col = parseInt(square.dataset.col);
                document.querySelectorAll(".square").forEach(s => s.classList.remove("selected"));
                this.handleClick(row, col);
                if (this.selectedPiece != null) {
                    document.querySelector(`[data-row="${this.selectedPosition.row}"][data-col="${this.selectedPosition.col}"]`).classList.add("selected");
                }
            })
        });
    }
}