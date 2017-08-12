import React from 'react'
import Board from "./board.jsx"

class Minesweeper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { dimension: undefined, size: "None" }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, dim) {
    this.setState({ size: e.target.value, dimension: dim })
  }

  render() {
    return(
      <div>
          <input
            className="button"
            type='button'
            value='Small'
            onClick={ (e) => this.handleChange(e, 6) } />
          <input
            className="button"
            type='button'
            value='Medium'
            onClick={ (e) => this.handleChange(e, 9) } />
          <input
            className="button"
            type='button'
            value='Large'
            onClick={ (e) => this.handleChange(e, 12) } />
          <Board
            dimension={ this.state.dimension }
            size={ this.state.size }/>
      </div>
    )
  }
}

export default Minesweeper
