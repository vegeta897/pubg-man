import React, { Component } from 'react';
class LFG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lfgPlayers: [
                'vegeta897',
                'voiper',
                'morgs'
            ]
        }
    }
    render() {
        const lfgPlayers = this.state.lfgPlayers.map((player, idx) => {
            return <li key={idx}>
                <button onClick={() => this.props.addPlayer(player)}>+</button>
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