import { BoardView } from '../views/BoardView.js';
import { Game } from '../models/Game.js';

let frontendBoard = document.getElementById('chessBoard');
export class GameController {
    constructor() {
        this.boardView = new BoardView(frontendBoard);
        this.game = new Game();
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
            if (this.game.selectedPiece == this.game.board.getSquare(row, col)) {
                this.game.selectedPosition = null;
                this.game.selectedPiece = null;
            } else if (this.game.board.getSquare(row, col) != null && this.game.board.getSquare(row, col).color == this.game.currentPlayer) {
                this.game.selectedPosition = { row, col };
                this.game.selectedPiece = this.game.board.getSquare(row, col);
            } else {
                this.game.movePiece(this.game.selectedPosition.row, this.game.selectedPosition.col, row, col);
                this.game.switchPlayer();
                this.game.selectedPiece = null;
                this.game.selectedPosition = null;
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
                this.handleClick(row, col);
            })
        });
    }
}
const gamecontroller = new GameController();