import React from 'react'
import Board from "./board.jsx"

class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {size: undefined};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ size: parseInt(e.target.value) })
    console.log("Game: e.target.value: ", e.target.value)
    // this.state.size = parseInt(e.target.value)
    console.log("Game: this.state.size: ", this.state.size)
  }

  render() {
    return(
      <div>
        {/* style={{border: 'solid crimson 1px', width:'208px', height: '208px', margin:'auto'}}> */}
          <button
            value = "3"
            onClick={ this.handleChange }>
            Small
          </button>
          <button
            value = "6"
            onClick={ this.handleChange }>
            Medium
          </button>
          <button
            value = "9"
            onClick={ this.handleChange }>
            Large
          </button>
          <Board
            size={ this.state.size } />
      </div>
    )
  }
}

export default Minesweeper
