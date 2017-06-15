import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Container, Message, Icon } from 'semantic-ui-react';
import Game from './Game'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { tooSmall: window.innerWidth < 1200, smallOkay: false };
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => { // https://stackoverflow.com/a/42141641/2612679
        this.setState({ tooSmall: !this.state.smallOkay && window.innerWidth < 1200 });
    };
    acceptSmallness = () => {
        this.setState({ smallOkay: true, tooSmall: false });
    };
    render() {
        let visibility = this.state.tooSmall ? {} : { display: 'none' };
        return (
            <Container className='App'>
                <Segment inverted padded attached={this.state.tooSmall ? "top" : null}>
                    <Header inverted as="h1" content="PUBG Manager" subheader={`Tick: ${this.props.tick}`} />
                </Segment>
                <Message style={visibility} icon warning
                         attached={this.state.tooSmall ? "bottom" : null}
                         onDismiss={this.acceptSmallness}>
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
function mapStateToProps(state, props) {
    return {
        tick: state.getIn(['global','tick'])
    }
}
export default connect(mapStateToProps)(App);