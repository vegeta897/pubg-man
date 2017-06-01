import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class LFG extends Component {
    render() {
        const lfgPlayers = this.props.players.map((player, idx) => {
            return <li key={idx}>
                <button onClick={() => this.props.dispatch(Actions.addToRoster(player.username))}>+</button>
                {player.username}</li>
        });
        return (
            <div>
                <h2>Looking For Group:</h2>
                <ul>{lfgPlayers}</ul>
            </div>
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