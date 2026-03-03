export class Piece {
    constructor(type, color, row, col) {
        this.type = type;
        this.color = color;
        this.row = row;
        this.col = col;
    }

    getValidMoves(board){
        return [];
    }
}