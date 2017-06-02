import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import LFG from './LFG';
import Roster from './Roster';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class Game extends Component {
    componentDidMount() { // https://stackoverflow.com/a/36299242/2612679
        this.props.actions.startTick(setInterval(this.props.actions.tick, 1000));
    }
    componentWillUnmount() {
        clearInterval(this.props.global.intervalID);
        this.props.actions.stopTick();
    }
    render() {
        return (
            <Grid container className='Game'>
                <Grid item xs={12}>
                    <Typography secondary type="caption">Tick: {this.props.global.tick}</Typography>
                </Grid>
                <Grid item md={4} sm={12}>
                    <LFG />
                </Grid>
                <Grid item md={4} sm={12}>
                    <Roster />
                </Grid>
            </Grid>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        global: state.get('global').toJS()
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);