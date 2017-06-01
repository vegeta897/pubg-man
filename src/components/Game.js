import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Players from './Players';

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
            <div className='Game'>
                <h3>Tick: {this.props.global.tick}</h3>
                <Players />
            </div>
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