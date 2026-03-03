import { Piece } from './Piece.js';
export class King extends Piece {
    constructor(color, row, col) {
        super("king", color, row, col);
    }

}