import React, { Component } from 'react'

class Board extends Component {
  constructor(props) {
    super(props);
    console.log("Board props: ", props);
    this.state = {size: props.size};
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps)
      this.state = {size: nextProps.size};
  }

  createBoard(size){
    this.state.board = new Array(size).fill(undefined).map(function(){return new Array(size).fill(undefined)})
    this.placeMines(size)
    this.fillBoard()
    console.log("creating board: ", this.state.board)
  }

  placeMines(mines){
    console.log("mines: ", mines)
    for (var i = 1; i < mines; i++){
      do {
        var row = Math.floor(Math.random() * mines)
        var col = Math.floor(Math.random() * mines)
      } while (this.state.board[row][col] != undefined)
      this.state.board[row][col] = -1
      // console.log(this.state.board)
    }
  }

  fillBoard() {
    var size = this.state.size
    for (var row = 0; row < size; row++){
      for (var col = 0; col < size; col++){
        if (this.state.board[row][col] == undefined)
          this.state.board[row][col] = this.countNeighboringMines(row,col)
      }
    }
  }

  countNeighboringMines(row,col) {
    var count = 0
    for (var offsetRow = -1; offsetRow <= 1; offsetRow++){
      for (var offsetCol = -1; offsetCol <= 1; offsetCol++){
        var compareRow = row + offsetRow
        var compareCol = col + offsetCol
        if (compareRow >= 0 && compareRow < this.state.size &&
            compareCol >= 0 && compareCol < this.state.size &&
            this.state.board[compareRow][compareCol] == -1)
          count += 1
      }
    }
    return count
  }

  render() {
    // console.log("Board: this.state.size", this.state.size)
    if (this.state.size != undefined)
      this.createBoard(this.state.size)
    return(
      <h1>Hi!</h1>
    )
  }
}

export default Board
