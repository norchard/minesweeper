import React from 'react'
import Minesweeper from './minesweeper.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Minesweeper</h1>
        <Minesweeper />
      </div>
    );
  }
}
