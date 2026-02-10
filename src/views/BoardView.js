export class BoardView {
    constructor(boardDiv) {
        this.boardDiv = boardDiv;
    }
    render() {
        this.boardDiv.innerHTML = "";
        for (let x = 7; x >= 0; x--) {
            for (let y = 0; y <= 7; y++) {
                let field = document.createElement("div")
                field.setAttribute("data-row", x);
                field.setAttribute("data-col", y);
                if ((x + y) % 2 != 0) {
                    field.classList.add("square", "square-light")
                } else {
                    field.classList.add("square", "square-dark")
                }
                this.boardDiv.appendChild(field);
            }
        }
    }
}