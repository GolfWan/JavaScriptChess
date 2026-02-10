import { BoardView } from '../views/BoardView.js';
import { Board } from '../models/Board.js';
let frontendBoard = document.getElementById('chessBoard');
export class GameController {
    constructor() {
        this.boardView = new BoardView(frontendBoard);
        this.board = new Board();
        this.boardView.render(this.board);
    }
}
const gamecontroller = new GameController();