import React from 'react'
import Board from "./board.jsx"

class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dimension: undefined, size: "None"};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var dimension;
    switch(e.target.value){
      case "Small":
        dimension = 3
        break
      case "Medium":
        dimension = 6
        break
      case "Large":
        dimension = 9
    }
    this.setState({ size: e.target.value, dimension: dimension})
    // console.log("Game: e.target.value: ", e.target.value)
    // this.state.size = parseInt(e.target.value)
    // console.log("Game: this.state.size: ", this.state.size)
    // console.log("Game: this.state.dimension: ", this.state.dimension)
  }

  render() {
    return(
      <div>
        {/* style={{border: 'solid crimson 1px', width:'208px', height: '208px', margin:'auto'}}> */}
          <input
            type='button'
            value='Small'
            onClick={ this.handleChange } />
          <input
            type='button'
            value='Medium'
            onClick={ this.handleChange } />
          <input
            type='button'
            value='Large'
            onClick={ this.handleChange } />
          <Board
            dimension={ this.state.dimension }
            size={ this.state.size }/>
      </div>
    )
  }
}

export default Minesweeper
