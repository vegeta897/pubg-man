import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as playerActions from '../actions/players';
import LFG from './LFG';
class Players extends Component {
    render() {
        const rosterList = this.props.players.roster.map((player, idx) => {
            return <li key={idx}>{player}</li>;
        });
        return (
            <div className='Roster'>
                <LFG addPlayer={this.props.actions.addToRoster}/>
                <h2>Roster</h2>
                <ol>
                    {rosterList}
                </ol>
            </div>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        players: state.players
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(playerActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Players);