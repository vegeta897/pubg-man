import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AddCircle from 'material-ui-icons/AddCircle';
import Typography from 'material-ui/Typography';

class LFG extends Component {
    render() {
        const lfgPlayers = this.props.players.map((player, idx) => {
            return <ListItem button key={idx}
                             onClick={() => this.props.dispatch(Actions.addToRoster(player.username))}
            >
                <ListItemIcon>
                    <AddCircle />
                </ListItemIcon>
                <ListItemText primary={player.username} />
            </ListItem>
        });
        return (
            <Card>
                <CardContent>
                    <Typography type="headline" component="h2">
                        Looking For Group
                    </Typography>
                    <Typography type="subheading">
                        Players you can recruit
                    </Typography>
                    <List>
                        {lfgPlayers}
                    </List>
                </CardContent>
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