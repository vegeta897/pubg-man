import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Container, Message, Sidebar, Icon } from 'semantic-ui-react';
import Game from './Game'
import { getWidth } from 'viewport-size';

class App extends PureComponent {
    constructor(props) {
        super(props);
        let browserWidth = getWidth();
        this.state = { tooSmall: browserWidth < 1200 && browserWidth >= 768, smallOkay: false };
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => { // https://stackoverflow.com/a/42141641/2612679
        let browserWidth = getWidth();
        this.setState({
            tooSmall: !this.state.smallOkay && browserWidth < 1200 && browserWidth >= 768
        });
    };
    acceptSmallness = () => {
        this.setState({ smallOkay: true, tooSmall: false });
    };
    render() {
        return (
            <Sidebar.Pushable as={Container} className='App'>
                <Sidebar animation="overlay" direction="top" visible={this.state.tooSmall}>
                    <Container text>
                        <Message size="small" icon warning onDismiss={this.acceptSmallness}>
                            <Icon name="resize horizontal" />
                            <Message.Content>
                                <Message.Header>This game is best played at 1200px width</Message.Header>
                                Make your browser wider for a better experience
                            </Message.Content>
                        </Message>
                    </Container>
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment inverted padded attached="top">
                        <Header inverted as="h1" content="PUBG Manager" />
                    </Segment>
                    <Game />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        tick: state.getIn(['global','tick'])
    }
}
export default connect(mapStateToProps)(App);