import React, { Component } from 'react';
import './App.css';
import Game from './Game'

class App extends Component {
  render() {
      return (
          <div className='App'>
              <div className='App-header'>
                  <h1>PUBG Manager</h1>
              </div>
              <Game />
          </div>
      );
  }
}
export default App;