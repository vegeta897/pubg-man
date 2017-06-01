import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import AddCircle from 'material-ui/svg-icons/content/add-circle';

class LFG extends Component {
    render() {
        const lfgPlayers = this.props.players.map((player, idx) => {
            return <ListItem key={idx}
                             leftIcon={<AddCircle />}
                             onClick={() => this.props.dispatch(Actions.addToRoster(player.username))}
                             primaryText={player.username}
            />
        });
        return (
            <Card style={{marginBottom: '20px'}}>
                <CardTitle title="Looking For Group" subtitle="Players you can recruit" />
                <List>
                    {lfgPlayers}
                </List>
            </Card>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        players: state.get('lfg').map(player => {
            return state.getIn(['players', 'byId', player]);
        })
    }
}
export default connect(mapStateToProps)(LFG);