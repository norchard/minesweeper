import React, { Component } from 'react'
import Cell from './cell.jsx'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state.board = props.board;
  }

  render() {
    return(
      <h1>Hi!</h1>
    )
  }
}

export default Board
