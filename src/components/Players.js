import React, { Component } from 'react';
import { connect } from 'react-redux';
import LFG from './LFG';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

class Players extends Component {
    render() {
        const rosterList = this.props.players.map((player, idx) => {
            return <ListItem key={idx}
                             primaryText={player.username} />;
        });
        return (
            <div className='Players'>
                <LFG />
                <Card>
                    <CardTitle title="Roster" subtitle="Players you've recruited" />
                    <List>{rosterList}</List>
                </Card>
            </div>
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
export default connect(mapStateToProps)(Players);