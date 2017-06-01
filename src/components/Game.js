import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Players from './Players';
import Grid from 'material-ui/Grid';

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
                    <h3>Tick: {this.props.global.tick}</h3>
                </Grid>
                <Grid item md={4} sm={12}>
                    <Players />
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