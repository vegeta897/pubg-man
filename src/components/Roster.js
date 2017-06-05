import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List } from 'semantic-ui-react';

class Roster extends Component {
    render() {
        let rosterList = this.props.players.map((player, idx) => {
            return <List.Item icon="user" content={player.username} key={idx} />;
        });
        if(rosterList.isEmpty()) {
            rosterList = rosterList.add(
                <List.Item key={0} content="None" />
            )
        }
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Roster
                    </Card.Header>
                    <Card.Meta>
                        Your players
                    </Card.Meta>
                    <Card.Description>
                        <List>
                            {rosterList}
                        </List>
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