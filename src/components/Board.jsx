import React, { Component } from 'react'

// class Cell extends Component {
//   constructor(props) {
//     super(props);
//     console.log(props)
//     this.state = {
//       guessed: props.guessed,
//       value: props.value,
//       onclick: props.onclick
//     };
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if(this.props != nextProps){
//       console.log("Updating cell state!")
//       this.state = {};
//     }
//   }
//
//   render() {
//     console.log("rendering Cell")
//     if ( this.state.guessed ){
//       return <div className="cell">{ this.state.value }</div>
//     } else {
//       return (<div
//                 className="cell"
//                 onClick={ this.state.onclick }>
//               </div>)
//     }
//   }
// }

class Board extends Component {
  constructor(props) {
    super(props);
    console.log("Board props: ", props);
    this.state = {
      dimension: props.dimension,
      size: props.size.toLowerCase(),
      board: [],
      gameOver: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps){
      this.state = { dimension: nextProps.dimension, size: nextProps.size.toLowerCase() };
      this.createBoard(nextProps.dimension);
    }
  }

  createBoard(dimension){
    this.state.board = new Array(dimension).fill(undefined)
                       .map(function(){return new Array(dimension).fill(undefined)})
    this.state.guessed = new Array(dimension).fill(undefined)
                         .map(function(){return new Array(dimension).fill(0)})
    this.placeMines(dimension - 1)
    this.fillBoard()
    console.log("creating board: ", this.state.board)
    console.log("creating guessed: ", this.state.guessed)
  }

  placeMines(mines){
    for (var i = 0; i < mines; i++){
      do {
        var row = Math.floor(Math.random() * mines)
        var col = Math.floor(Math.random() * mines)
      } while (this.state.board[row][col] != undefined)
      this.state.board[row][col] = -1
    }
  }

  fillBoard() {
    var dimension = this.state.dimension
    for (var row = 0; row < dimension; row++){
      for (var col = 0; col < dimension; col++){
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
        if (compareRow >= 0 && compareRow < this.state.dimension &&
            compareCol >= 0 && compareCol < this.state.dimension &&
            this.state.board[compareRow][compareCol] == -1)
          count += 1
      }
    }
    return count
  }

  guessNeighboringZeros(row, col) {
    var offSet = [-1, 0, 1], rowOffSet, colOffset
    for ( rowOffSet in offSet ){
      for ( colOffset in offSet ){
        var compareRow = row + rowOffSet
        var compareCol = col + colOffset
        if (compareRow >= 0 && compareRow < this.state.dimension &&
            compareCol >= 0 && compareCol < this.state.dimension){
          this.state.guessed[compareRow][compareCol] = 1
          if (this.state.board[compareRow][compareCol] == 0)
            this.guessNeighboringZeros(compareRow, compareCol)
        }
      }
    }
  }
  /* TODO: refactor all functions to use setState and be 'pure' */

  markGuessed(row, col) {
    var newGuessed = this.state.guessed.slice()
    newGuessed[row][col] = 1
    this.setState({ guessed: newGuessed })
  }

  gameOver(){
    var newGuessed = this.state.guessed.slice()
    for (var row in newGuessed){
      newGuessed[row].fill(1)
    }
    this.setState({ guessed: newGuessed, gameOver: true })
  }

  clickHandler(e, value, row, col) {
    this.markGuessed(row, col)
    if (value == 0)
      this.guessNeighboringZeros(row, col)
    else if (value == -1) {
      this.gameOver()
    }
    // console.log("Setting cell guessed to one")

    // console.log("event: ", e.target)
    // console.log("row index: ", rowIndex)
    // console.log("col index: ", colIndex)
    // console.log("guessed: ", this.state.guessed)
  }

  render() {
    console.log("rendering!")
    return(
      <div className={ "board " + this.state.size }>
        {
          this.state.board.map( (row, rowIndex) => {
            return row.map( (cell, colIndex) => {
              if ( this.state.guessed[rowIndex][colIndex] )
                return <div className="cell">{ cell == -1 ? "*" : cell }</div>
              else
                return <div className="cell" onClick={ (e) => this.clickHandler(e, cell, rowIndex, colIndex) }></div>
            })
          })
        }
      </div>
    )
  }
}

export default Board

// return <Cell
//         guessed={ this.state.guessed[rowIndex][colIndex] }
//         value={ cell }
//         onclick={ (e) => this.clickHandler(e, cell, rowIndex, colIndex)} />
