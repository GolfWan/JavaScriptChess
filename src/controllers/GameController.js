import { BoardView } from '../views/BoardView.js';
import { Game } from '../models/Game.js';

let frontendBoard = document.getElementById('chessBoard');
export class GameController {
    constructor() {
        this.boardView = new BoardView(frontendBoard);
        this.game = new Game();
        this.boardView.render(this.game.board);
    }
}
const gamecontroller = new GameController();