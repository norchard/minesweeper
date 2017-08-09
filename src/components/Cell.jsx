import React, { Component } from 'react'

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.unitStyle = {
      backgroundColor: 'mistyrose',
      border: 'solid coral 1px',
      height: '50px',
      width: '50px',
      'float': 'left'
    }
  }

  render() {
    // function clickHandler(e) {
    //   if (this.state.unitStyle.backgroundColor == 'mistyrose')
    //     this.setState((backgroundColor, props) => 'white')
    // }

    return(
      <div
        style={this.state.unitStyle}>
      </div>
    )
  }
}

export default Cell
