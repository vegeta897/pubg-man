import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List } from 'semantic-ui-react';

class Roster extends Component {
    constructor(props) {
        super(props);
        this.state = { noPlayers: true };
    }
    componentWillMount() {
        this.setState({ noPlayers: this.props.players.isEmpty() });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ noPlayers: nextProps.players.isEmpty() });
    }
    render() {
        let rosterList = this.props.players.toJS().map((player, idx) => {
            return <List.Item icon="user" content={player.username} key={idx} />;
        });
        if(this.state.noPlayers) rosterList.push(<List.Item key={0} content="None" />);
        return (
            <Card fluid className='Roster'>
                <Card.Content>
                    <Card.Header content="Roster" />
                    <Card.Meta content="Your players" />
                    <Card.Description>
                        <List children={rosterList} />
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        players: state.get('roster').map(player => {
            return state.getIn(['players', 'byId', player]);
        })
    }
}
export default connect(mapStateToProps)(Roster);