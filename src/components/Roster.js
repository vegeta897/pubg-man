import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List, Label } from 'semantic-ui-react';

class Roster extends Component {
    render() {
        let rosterList = this.props.players.toJS().map((player, idx) => {
            return <List.Item icon="user" content={player.username} key={idx} />;
        });
        if(this.props.noPlayers) rosterList.push(<List.Item key={0} content="None" />);
        return (
            <Card fluid className='Roster'>
                <Card.Content>
                    {this.props.players.size > 0 &&
                    <Label circular floating content={this.props.players.size}
                           color="grey" size="large" />}
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
        }),
        noPlayers: state.get('roster').isEmpty()
    }
}
export default connect(mapStateToProps)(Roster);