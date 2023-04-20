class Letter {
    constructor(row, column, fixed){
        this.row = row,
        this.column = column
        this.fixed = fixed
        this.inWordAcross = false
        this.inWordDown = false
        this.score = 0
        this.activeLetter = false
    }
}