import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as rosterActions from '../actions/roster';
import LFG from './LFG';
class Roster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const rosterList = this.props.roster.map((player, idx) => {
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
function mapStateToProps(state, props) {
    return {
        roster: state.roster
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(rosterActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Roster);