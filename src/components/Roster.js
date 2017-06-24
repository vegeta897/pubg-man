import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { List, Container } from 'semantic-ui-react';

class Roster extends PureComponent {
    render() {
        let key = 0;
        let rosterList = this.props.players.map(player => {
            return <List.Item icon="user" content={player.username} key={key++} />;
        });
        return (
            <Container>
                {
                    this.props.noPlayers ? 'There are no players in your roster' :
                        <List size="huge" children={rosterList} />
                }
            </Container>
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