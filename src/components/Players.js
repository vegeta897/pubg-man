import React from 'react';
import { connect } from 'react-redux';
import SubMenu from './SubMenu';
import LFG from './LFG';
import Roster from './Roster';

function mapStateToProps(state, props) {
    return {
        ...props,
        initialTab: 'lfg',
        className: 'Players',
        color: 'orange',
        tabs: [
            {
                component: <LFG />,
                key: 'lfg', name: 'LFG',
                notifyValue: state.get('lfg').size
            },
            {
                component: <Roster />,
                key: 'roster', name: 'Roster',
                notifyValue: state.get('roster').size
            }
        ]
    }
}
export default connect(mapStateToProps)(SubMenu);