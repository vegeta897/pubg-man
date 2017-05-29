import React, { Component } from 'react';
class LFG extends Component {
    constructor(props) {
        super(props);
        this.onAddPlayerToRoster = this.onAddPlayerToRoster.bind(this);
        this.state = {
            lfgPlayers: [
                'vegeta897',
                'voiper',
                'morgs'
            ]
        }
    }
    onAddPlayerToRoster(player) {
        this.props.addPlayer(player);
    }
    render() {
        const lfgPlayers = this.state.lfgPlayers.map((player, idx) => {
            return <li key={idx}>
                <button onClick={() => this.onAddPlayerToRoster(player)}>[+]</button>
                {player}</li>
        });
        return (
            <div>
                <h2>Looking For Group:</h2>
                <ul>
                    {lfgPlayers}
                </ul>
            </div>
        );
    }
}
export default LFG;