import { Piece } from './Piece.js';
export class Bishop extends Piece {
    constructor(color, row, col) {
        super("bishop", color, row, col);
    }


    getValidMoves(board, game) {
        let validMoves = [];
        let directions = [
            { rowChange: 1, colChange: 1 },
            { rowChange: -1, colChange: -1 },
            { rowChange: 1, colChange: -1 },
            { rowChange: -1, colChange: 1 }
        ];
        for (let direction of directions) {
            let currentRow = this.row;
            let currentCol = this.col;

            while (true) {
                currentRow += direction.rowChange
                currentCol += direction.colChange
                if (currentRow < 0 || currentRow > 7 || currentCol < 0 || currentCol > 7) {
                    break;
                }
                if (board.getSquare(currentRow, currentCol) == null) {
                    validMoves.push({ row: currentRow, col: currentCol });
                } else if (board.getSquare(currentRow, currentCol).color != board.getSquare(this.row, this.col).color) {
                    validMoves.push({ row: currentRow, col: currentCol });
                    break;
                } else {
                    break;
                }

            }
        }
        return validMoves;
    }
}