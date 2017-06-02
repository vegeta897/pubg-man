import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Game from './Game'

class App extends Component {
  render() {
      return (
          <div className='App' style={{ paddingTop: '70px' }}>
              <AppBar className='App-header'>
                  <Toolbar>
                      <Typography type="title">PUBG Manager</Typography>
                  </Toolbar>
              </AppBar>
              <Game />
          </div>
      );
  }
}
export default App;