import { Board } from './Board.js';
import { Pawn } from './Pawn.js';
import { Rook } from './Rook.js';
import { Knight } from './Knight.js';
import { Bishop } from './Bishop.js';
import { Queen } from './Queen.js';
import { King } from './King.js';
export class Game {
    constructor() {
        this.board = new Board();
        this.initializeBoard();
        this.currentPlayer = 'white';
        this.lastMove = { piece: null, fromRow: null, fromCol: null, toRow: null, toCol: null }
    }

    initializeBoard() {
        for (let x = 0; x <= 7; x++) {
            let pawnWhite = new Pawn('white', 1, x);
            this.board.setSquare(1, x, pawnWhite);
            let pawnBlack = new Pawn('black', 6, x);
            this.board.setSquare(6, x, pawnBlack);
        }
        for (let x = 0; x <= 7; x++) {
            if (x == 0 || x == 7) {
                let rookWhite = new Rook('white', 0, x);
                this.board.setSquare(0, x, rookWhite);
                let rookBlack = new Rook('black', 7, x);
                this.board.setSquare(7, x, rookBlack);
            }
            if (x == 1 || x == 6) {
                let knightWhite = new Knight('white', 0, x);
                this.board.setSquare(0, x, knightWhite);
                let knightBlack = new Knight('black', 7, x);
                this.board.setSquare(7, x, knightBlack);
            }
            if (x == 2 || x == 5) {
                let bishopWhite = new Bishop('white', 0, x);
                this.board.setSquare(0, x, bishopWhite);
                let bishopBlack = new Bishop('black', 7, x);
                this.board.setSquare(7, x, bishopBlack);
            }
            if (x == 3) {
                let queenWhite = new Queen('white', 0, x);
                this.board.setSquare(0, x, queenWhite);
                let queenBlack = new Queen('black', 7, x);
                this.board.setSquare(7, x, queenBlack);
            }
            if (x == 4) {
                let kingWhite = new King('white', 0, x);
                this.board.setSquare(0, x, kingWhite);
                let kingBlack = new King('black', 7, x);
                this.board.setSquare(7, x, kingBlack);
            }
        }
    }
    checkMove(fromRow, fromCol, toRow, toCol) {
        let piece = this.board.getSquare(fromRow, fromCol);
        if (piece != null) {
            let validMovesArray = piece.getValidMoves(this.board, this);
            if (validMovesArray.some(move => move.row === toRow && move.col === toCol)) {
                if (this.isMoveLegal(fromRow, fromCol, toRow, toCol)) {
                    this.movePiece(fromRow, fromCol, toRow, toCol);
                    this.switchPlayer();
                    return true;
                }
            }
        }
    }

    switchPlayer() {
        if (this.currentPlayer == "white") {
            this.currentPlayer = "black";
        } else if (this.currentPlayer == "black") {
            this.currentPlayer = "white";
        }
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        const prevLastMove = this.lastMove;
        const targetBefore = this.board.getSquare(toRow, toCol);

        let movingPiece = this.board.getSquare(fromRow, fromCol);

        if (movingPiece.type == "king" && Math.abs(fromCol - toCol) == 2) {
            if (toCol > fromCol) {
                this.board.setSquare(toRow, toCol, movingPiece);
                this.board.setSquare(fromRow, fromCol, null);
                movingPiece.col = toCol;
                movingPiece.row = toRow;

                let rook = this.board.getSquare(fromRow, 7);
                this.board.setSquare(fromRow, toCol - 1, rook);
                this.board.setSquare(fromRow, 7, null);
                rook.col = toCol - 1;
                rook.row = fromRow;

                movingPiece.hasMoved = true;
                rook.hasMoved = true;

                this.lastMove = { piece: movingPiece, fromRow, fromCol, toRow, toCol };
                return;
            } else {
                this.board.setSquare(toRow, toCol, movingPiece);
                this.board.setSquare(fromRow, fromCol, null);
                movingPiece.col = toCol;
                movingPiece.row = toRow;

                let rook = this.board.getSquare(fromRow, 0);
                this.board.setSquare(fromRow, toCol + 1, rook);
                this.board.setSquare(fromRow, 0, null);
                rook.col = toCol + 1;
                rook.row = fromRow;

                movingPiece.hasMoved = true;
                rook.hasMoved = true;

                this.lastMove = { piece: movingPiece, fromRow, fromCol, toRow, toCol };
                return;
            }
        }

        movingPiece.hasMoved = true;
        movingPiece.row = toRow;
        movingPiece.col = toCol;
        this.board.setSquare(toRow, toCol, movingPiece);
        this.board.setSquare(fromRow, fromCol, null);

        if (
            movingPiece.type === "pawn" &&
            fromCol !== toCol &&
            targetBefore == null &&
            prevLastMove && prevLastMove.piece &&
            prevLastMove.piece.type === "pawn" &&
            prevLastMove.piece.color !== movingPiece.color &&
            Math.abs(prevLastMove.fromRow - prevLastMove.toRow) === 2 &&
            prevLastMove.toRow === fromRow &&
            prevLastMove.toCol === toCol
        ) {
            this.board.setSquare(fromRow, toCol, null);
        }

        this.lastMove = { piece: movingPiece, fromRow, fromCol, toRow, toCol };
    }

    isKingInCheck(color) {
        let currentKing;
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y <= 7; y++) {
                if (this.board.getSquare(x, y) != null && this.board.getSquare(x, y).type == "king" && this.board.getSquare(x, y).color == color) {
                    currentKing = this.board.getSquare(x, y);
                }
            }
        }
        if (!currentKing) {
            return false;
        }
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y <= 7; y++) {
                let currentPiece = this.board.getSquare(x, y);
                if (currentPiece != null && currentPiece.color != color) {
                    if (currentPiece.getValidMoves(this.board, this).some(validMove => validMove.row == currentKing.row && validMove.col == currentKing.col)) {
                        return true;
                    }
                }
            }
        }
        return false
    }

    isMoveLegal(fromRow, fromCol, toRow, toCol) {
        let piecePosition = this.board.getSquare(fromRow, fromCol);
        let pieceTargetPosition = this.board.getSquare(toRow, toCol);
        let dir;
        let rookCol;
        if (piecePosition.type == "king" && fromRow == toRow && Math.abs(fromCol - toCol) == 2 && piecePosition.hasMoved == false) {
            if (toCol > fromCol) {
                dir = 1;
                rookCol = 7;
            }
            if (toCol < fromCol) {
                dir = -1;
                rookCol = 0;
            }
            let rook = this.board.getSquare(fromRow, rookCol);
            if (rook == null || rook.type != "rook" || rook.hasMoved == true) {
                return false;
            }
            let currentCol = fromCol + dir;
            for (currentCol; currentCol != rookCol; currentCol += dir) {
                if (this.board.getSquare(fromRow, currentCol) != null) {
                    return false;
                }
            }
            if (this.isKingInCheck(piecePosition.color)) {
                return false;
            }
            for (let i = 1; i <= 2; i++) {
                const midCol = fromCol + dir * i;
                const startPiece = this.board.getSquare(fromRow, fromCol);
                const midPiece = this.board.getSquare(fromRow, midCol);
                const oldRow = piecePosition.row;
                const oldCol = piecePosition.col;
                let inCheck = false;
                this.board.setSquare(fromRow, fromCol, null);
                this.board.setSquare(fromRow, midCol, piecePosition);
                piecePosition.row = fromRow;
                piecePosition.col = midCol;
                inCheck = this.isKingInCheck(piecePosition.color);
                this.board.setSquare(fromRow, midCol, midPiece);
                this.board.setSquare(fromRow, fromCol, startPiece);
                piecePosition.row = oldRow;
                piecePosition.col = oldCol;
                if (inCheck) return false;
            }
            return true;
        }
        this.board.setSquare(toRow, toCol, piecePosition);
        this.board.setSquare(fromRow, fromCol, null);
        piecePosition.row = toRow;
        piecePosition.col = toCol;
        let kingCheck = this.isKingInCheck(piecePosition.color);
        this.board.setSquare(fromRow, fromCol, piecePosition);
        this.board.setSquare(toRow, toCol, pieceTargetPosition);
        piecePosition.row = fromRow;
        piecePosition.col = fromCol;
        return !kingCheck;
    }

    isCheckmate() {
        if (!this.isKingInCheck(this.currentPlayer)) {
            return false;
        }
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y <= 7; y++) {
                if (this.board.getSquare(x, y) != null && this.board.getSquare(x, y).color == this.currentPlayer) {
                    let validMoves = this.board.getSquare(x, y).getValidMoves(this.board, this);
                    for (let move of validMoves) {
                        if (this.isMoveLegal(x, y, move.row, move.col)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    isPatt(color) {
        if (this.isKingInCheck(this.currentPlayer)) {
            return false;
        }
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y <= 7; y++) {
                if (this.board.getSquare(x, y) != null && this.board.getSquare(x, y).color == this.currentPlayer) {
                    let validMoves = this.board.getSquare(x, y).getValidMoves(this.board, this);
                    for (let move of validMoves) {
                        if (this.isMoveLegal(x, y, move.row, move.col)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}