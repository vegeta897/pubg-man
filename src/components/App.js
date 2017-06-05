import React, { Component } from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';
import Game from './Game'

class App extends Component {
  render() {
      return (
          <Container className='App'>
              <Segment inverted padded>
                  <Header as="h1">PUBG Manager</Header>
              </Segment>
              <Game />
          </Container>
      );
  }
}
export default App;