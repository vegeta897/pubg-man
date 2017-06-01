import React, { Component } from 'react';
import { connect } from 'react-redux';
import LFG from './LFG';

class Players extends Component {
    render() {
        const rosterList = this.props.players.map((player, idx) => {
            return <li key={idx}>{player.username}</li>;
        });
        return (
            <div className='Roster'>
                <LFG />
                <h2>Roster:</h2>
                <ol>{rosterList}</ol>
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