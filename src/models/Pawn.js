import { Piece } from './Piece.js';
export class Pawn extends Piece {
    constructor(color, row, col) {
        super("pawn", color, row, col);
    }

}