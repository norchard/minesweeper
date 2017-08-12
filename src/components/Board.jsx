import React, { Component } from 'react'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimension: props.dimension,
      size: props.size.toLowerCase(),
      board: [],
      guessed: [],
      lost: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.state = { dimension: nextProps.dimension, size: nextProps.size.toLowerCase() }
      this.createBoard(nextProps.dimension)
    }
  }

  squareBoard(dimension, value) {
    return new Array(dimension).fill().map(() => new Array(dimension).fill(value))
  }

  createBoard(dimension) {
    var board = this.squareBoard(dimension, undefined)
    var guessed = this.squareBoard(dimension, 0)
    this.placeMines(board, dimension, Math.floor(dimension * 1.3))
    this.fillBoard(board)
    this.setState({ board: board, guessed: guessed })
  }

  placeMines(board, dimension, mines) {
    for (var i = 0; i < mines; i++){
      do {
        var row = Math.floor(Math.random() * dimension)
        var col = Math.floor(Math.random() * dimension)
      } while (board[row][col] != undefined)
      board[row][col] = -1
    }
  }

  fillBoard(board) {
    for (var row = 0; row < this.state.dimension; row++) {
      for (var col = 0; col < this.state.dimension; col++) {
        if (board[row][col] == undefined)
          board[row][col] = this.countNeighboringMines(board, row, col)
      }
    }
  }

  countNeighboringMines(board, row, col) {
    var count = 0
    for (var compareRow = row - 1; compareRow <= row + 1; compareRow++){
      for (var compareCol = col - 1; compareCol <= col + 1; compareCol++){
        if (compareRow >= 0 && compareRow < this.state.dimension &&
            compareCol >= 0 && compareCol < this.state.dimension &&
            board[compareRow][compareCol] == -1)
          count += 1
      }
    }
    return count
  }

  guessNeighbors(row, col, newGuesses) {
    var rowStart = -1
    var colStart = -1
    var rowEnd = 1
    var colEnd = 1

    if (row == 0)
      rowStart = 0
    else if (row == this.state.dimension - 1)
      rowEnd = 0

    if (col == 0)
      colStart = 0
    else if (col == this.state.dimension - 1)
      colEnd = 0

    for (var i = rowStart; i <= rowEnd; i++){
      for (var j = colStart; j <= colEnd; j++){
        if (this.state.guessed[row + i][col + j] == 0 &&
            newGuesses[row + i][col + j] == 0){
          newGuesses[row + i][col + j] = 1
          if (this.state.board[row + i][col + j] == 0)
            this.guessNeighbors(row + i, col + j, newGuesses)
        }
      }
    }
  }

      // for (var checkRow = row - 1; checkRow <= row + 1; checkRow++){
      //   for (var checkCol = col - 1; checkCol <= col + 1; checkCol++){
      //     if (checkRow < 0 || checkRow >= this.state.dimension ||
      //         checkCol < 0 || checkCol >= this.state.dimension)
      //         continue
      //
      //     if (this.state.guessed[checkRow][checkCol] == 0) {
      //       this.markGuessed(checkRow,checkCol)
      //       if (this.state.board[checkRow][checkCol] == 0)
      //         this.guessNeighbors(checkRow,checkCol, num + 1)
      //     }
      //   }
      // }

  markGuessed(newGuesses) {
    var combined = this.state.guessed.map( (row, rowIndex) =>
      row.map( (cell, colIndex) => newGuesses[rowIndex][colIndex] || cell ))
    this.setState({ guessed: combined })
  }

  gameOver() {
    var allGuessed = this.squareBoard(this.state.dimension, 1)
    this.setState({ guessed: allGuessed, lost: true })
  }

  clickHandler(value, row, col) {
    if (value == -1){
      this.gameOver()
      return
    }
    var mark = this.squareBoard(this.state.dimension, 0)
    if (value == 0)
      this.guessNeighbors(row, col, mark)
    else
      mark[row][col] = 1
    this.markGuessed(mark)
  }

  leftClickHandler(e, value, row, col) {
    e.preventDefault()
    var lock = this.squareBoard(this.state.dimension, 0)
    if (this.state.guessed[row][col] == 0)
      this.state.guessed[row][col] = 2
    else if (this.state.guessed[row][col] == 2)
      this.state.guessed[row][col] = 0
    this.markGuessed(lock)
  }

  checkWon() {
    for (var rowIndex = 0; rowIndex < this.state.dimension; rowIndex++){
      for (var colIndex = 0; colIndex < this.state.dimension; colIndex++){
        if (this.state.guessed[rowIndex][colIndex] == 0 && this.state.board[rowIndex][colIndex] != -1)
          return false
      }
    }
    return true
  }

  render() {
    var won = this.checkWon()
    return(
      <div className={ "board " + this.state.size }>
        {
          this.state.board.map( (row, rowIndex) =>
            row.map( (cell, colIndex) => {
              if ( this.state.guessed[rowIndex][colIndex] == 1 )
                return (
                  <div className="cell guessed">
                    { ["💣", this.state.lost ? "💥" : "🌾",1,2,3,4,5,6,7,8][cell + 1] }
                  </div>)
              else if ( won )
                return (
                  <div className="cell guessed">
                    { ["🐶","🐸","🐱","🦊","🐵","🐷","🐹","🐼","🐨","🐻"][Math.floor(Math.random() * 10)] }
                  </div>)
              else if ( this.state.guessed[rowIndex][colIndex] == 2 )
                return (
                  <div
                    className="cell"
                    onContextMenu={ (e) => this.leftClickHandler(e, cell, rowIndex, colIndex) }>
                    🔒
                  </div>)
              else
                return (
                  <div
                    className="cell guessable"
                    onClick={ () => this.clickHandler(cell, rowIndex, colIndex)}
                    onContextMenu={ (e) => this.leftClickHandler(e, cell, rowIndex, colIndex)} >
                  </div>)
            })
          )
        }
      </div>
    )
  }
}

export default Board
