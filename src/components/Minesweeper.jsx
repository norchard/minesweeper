import React from 'react'
import Board from "./board.jsx"
import Cell from "./cell.jsx"

class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {player: 1, freezeBoard: false, winner: false};
  }

  createBoard(e){
    let size = parseInt(e.target.value)
    this.state.board = new Array(size).fill(new Array(size).fill(undefined))
    console.log(this.state.board)
  }

  render() {
    return(
      <div>
        {/* style={{border: 'solid crimson 1px', width:'208px', height: '208px', margin:'auto'}}> */}
          <button
            value = "3"
            onClick={this.createBoard.bind(this)}>
            Small
          </button>
          <button
            value = "6"
            onClick={this.createBoard.bind(this)}>
            Medium
          </button>
          <button
            value = "9"
            onClick={this.createBoard.bind(this)}>
            Large
          </button>
          {/* <Board
            board={this.state.board} /> */}
      </div>
    )
  }
}

export default Minesweeper
