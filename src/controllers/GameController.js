import { BoardView } from '../views/BoardView.js';
import { Game } from '../models/Game.js';

let frontendBoard = document.getElementById('chessBoard');
export class GameController {
    constructor() {
        this.game = new Game();
        this.boardView = new BoardView(frontendBoard);
        this.boardView.render(this.game.board);
        this.addEventListener();
    }
    handleClick(row, col) {
        if (this.game.selectedPiece == null) {
            if (this.game.board.getSquare(row, col) != null && this.game.board.getSquare(row, col).color == this.game.currentPlayer) {
                this.game.selectedPosition = { row, col };
                this.game.selectedPiece = this.game.board.getSquare(row, col);
            }
        } else {
            let validMovesArray = this.game.selectedPiece.getValidMoves(this.game.board);
            if (this.game.selectedPiece == this.game.board.getSquare(row, col)) {
                this.game.selectedPosition = null;
                this.game.selectedPiece = null;
            } else if (this.game.board.getSquare(row, col) != null && this.game.board.getSquare(row, col).color == this.game.currentPlayer) {
                this.game.selectedPosition = { row, col };
                this.game.selectedPiece = this.game.board.getSquare(row, col);
            } else {
                if (validMovesArray.some(move => move.row === row && move.col === col)) {
                    if (this.game.isMoveLegal(this.game.selectedPosition.row, this.game.selectedPosition.col, row, col)) {
                        this.game.movePiece(this.game.selectedPosition.row, this.game.selectedPosition.col, row, col);
                        this.game.switchPlayer();
                        if (this.game.isPatt(this.game.currentPlayer)) {
                            alert("Patt");
                        }
                        if (this.game.isCheckmate(this.game.currentPlayer)) {
                            alert("Schachmatt");
                        }
                        this.game.selectedPiece = null;
                        this.game.selectedPosition = null;
                        this.boardView.render(this.game.board);
                        this.addEventListener();
                    }
                }
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
                if (this.game.selectedPiece != null) {
                    document.querySelector(`[data-row="${this.game.selectedPosition.row}"][data-col="${this.game.selectedPosition.col}"]`).classList.add("selected");
                }
            })
        });
    }
}