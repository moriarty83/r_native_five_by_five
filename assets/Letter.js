class Letter {
    constructor(index, row, column, fixed) {
      this.index = index;
      (this.row = row), (this.col = column);
      this.fixed = fixed;
      this.inWordAcross = false;
      this.inWordDown = false;
      this.score = 0;
      this.selectedLetter = false;
      this.text = null;
    }
  }