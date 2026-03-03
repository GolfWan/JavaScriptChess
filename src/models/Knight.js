import { Piece } from './Piece.js';
export class Knight extends Piece {
    constructor(color, row, col) {
        super("knight", color, row, col);
    }
    getValidMoves(board) {
        let validMoves = [];
        let moves = [
            { rowChange: 2, colChange: 1 },
            { rowChange: 2, colChange: -1 },
            { rowChange: -2, colChange: 1 },
            { rowChange: -2, colChange: -1 },
            { rowChange: 1, colChange: 2 },
            { rowChange: 1, colChange: -2 },
            { rowChange: -1, colChange: 2 },
            { rowChange: -1, colChange: -2 },
        ];

        for (let move of moves) {
            let currentRow = this.row;
            let currentCol = this.col;
            currentRow += move.rowChange
            currentCol += move.colChange
            if (currentRow <= 7 && currentRow >= 0 && currentCol <= 7 && currentCol >= 0) {
                if (board.getSquare(currentRow, currentCol) == null) {
                    validMoves.push({ row: currentRow, col: currentCol });
                } else if (board.getSquare(currentRow, currentCol).color != board.getSquare(this.row, this.col).color) {
                    validMoves.push({ row: currentRow, col: currentCol });
                }
            }
        }
        return validMoves;
    }
}