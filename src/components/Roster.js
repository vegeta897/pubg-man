import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List, Label } from 'semantic-ui-react';

class Roster extends Component {
    render() {
        let rosterList = this.props.players.toJS().map((player, idx) => {
            return <List.Item icon="user" content={player.username} key={idx} />;
        });
        return (
            <Card fluid className='Roster'>
                <Card.Content>
                    {this.props.players.size > 0 &&
                    <Label circular floating size="large" content={this.props.players.size} />}
                    <Card.Header content="Roster" />
                    <Card.Meta content="Your players" />
                    <Card.Description content={this.props.noPlayers ? 'None' : <List children={rosterList} />} />
                </Card.Content>
            </Card>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        players: state.get('roster').map(player => {
            return state.getIn(['players', 'byId', player]);
        }),
        noPlayers: state.get('roster').isEmpty()
    }
}
export default connect(mapStateToProps)(Roster);