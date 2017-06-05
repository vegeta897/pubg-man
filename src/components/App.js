import React, { Component } from 'react';
import { Segment, Header, Container, Message, Icon } from 'semantic-ui-react';
import Game from './Game'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { tooSmall: window.innerWidth < 1200 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() { // https://stackoverflow.com/a/42141641/2612679
        this.setState({ tooSmall: window.innerWidth < 1200 });
    }
    render() {
        let visibility = this.state.tooSmall ? {} : { display: 'none' };
        return (
            <Container className='App'>
                <Segment inverted padded attached={this.state.tooSmall ? "top" : null}>
                    <Header as="h1">PUBG Manager</Header>
                </Segment>
                <Message style={visibility} icon attached={this.state.tooSmall ? "bottom" : null} warning>
                    <Icon name="resize horizontal" />
                    <Message.Content>
                        <Message.Header>This game is best played at 1200px width</Message.Header>
                        Make your browser wider for a better experience
                    </Message.Content>
                </Message>
                <Game />
            </Container>
        );
    }
}
export default App;