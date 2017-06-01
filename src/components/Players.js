import React, { Component } from 'react';
import { connect } from 'react-redux';
import LFG from './LFG';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class Players extends Component {
    render() {
        const rosterList = this.props.players.map((player, idx) => {
            return <ListItem button key={idx}>
                <ListItemText primary={player.username} />
            </ListItem>;
        });
        return (
            <Grid container className='Players'>
                <Grid item xs={12}>
                    <LFG />
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                Roster
                            </Typography>
                            <Typography type="subheading">
                                Your players
                            </Typography>
                            <List>
                                {rosterList}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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