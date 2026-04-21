import { Piece } from './Piece.js';
export class Pawn extends Piece {
    constructor(color, row, col) {
        super("pawn", color, row, col);
    }

    getValidMoves(board, game) {
        let validMoves = [];
        let direction;
        let lastMove = game.lastMove;
        switch (this.color) {
            case "white":
                direction = 1;
                break;
            case "black":
                direction = -1;
                break;
        }
        if (this.row + direction <= 7 && this.row + direction >= 0 && this.col <= 7 && this.col >= 0) {
            if (board.getSquare(this.row + direction, this.col) == null) {
                validMoves.push({ row: this.row + direction, col: this.col });
                if (this.row == 1 && board.getSquare(this.row + direction + direction, this.col) == null) {
                    validMoves.push({ row: this.row + direction + direction, col: this.col });
                } else if (this.row == 6 && board.getSquare(this.row + direction + direction, this.col) == null) {
                    validMoves.push({ row: this.row + direction + direction, col: this.col });
                }
            }
        }
        if (this.row + direction <= 7 && this.row + direction >= 0 && this.col - 1 <= 7 && this.col - 1 >= 0) {
            if (board.getSquare(this.row + direction, this.col - 1) != null) {
                if (board.getSquare(this.row + direction, this.col - 1).color != board.getSquare(this.row, this.col).color) {
                    validMoves.push({ row: this.row + direction, col: this.col - 1 });
                }
            }
            if (this.row + direction <= 7 && this.row + direction >= 0 && this.col + 1 <= 7 && this.col + 1 >= 0) {
                if (board.getSquare(this.row + direction, this.col + 1) != null) {
                    if (board.getSquare(this.row + direction, this.col + 1).color != board.getSquare(this.row, this.col).color) {
                        validMoves.push({ row: this.row + direction, col: this.col + 1 });
                    }
                }
            }
        }
        if (lastMove && lastMove.piece && lastMove.piece.type === "pawn") {
            if (Math.abs(lastMove.fromRow - lastMove.toRow) === 2) {
                if (lastMove.toRow === this.row && Math.abs(lastMove.toCol - this.col) === 1) {
                    validMoves.push({ row: this.row + direction, col: lastMove.toCol });
                    board.setSquare(this.row, lastMove.toCol, null);
                }
            }
        }
        return validMoves;
    }
}