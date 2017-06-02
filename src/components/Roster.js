import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class Roster extends Component {
    render() {
        let rosterList = this.props.players.map((player, idx) => {
            return <ListItem button key={idx}>
                <ListItemText primary={player.username} />
            </ListItem>;
        });
        if(rosterList.isEmpty()) {
            rosterList = rosterList.add(
                <ListItem disabled key={0}><ListItemText primary="None" /></ListItem>
            )
        }
        return (
            <Card className='Roster'>
                <CardContent>
                    <Typography type="headline" component="h2">
                        Roster
                    </Typography>
                    <Typography secondary type="subheading">
                        Your players
                    </Typography>
                    <List>
                        {rosterList}
                    </List>
                </CardContent>
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