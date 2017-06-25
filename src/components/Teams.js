import React from 'react';
import { connect } from 'react-redux';
import SubMenu from './SubMenu';
import CreateTeam from './CreateTeam';
import EditTeam from './EditTeam';

function mapStateToProps(state, props) {
    return {
        ...props,
        initialTab: 'create',
        className: 'Teams',
        color: 'green',
        tabs: [
            {
                component: <CreateTeam />,
                key: 'create', name: 'Create Team',
                notifyValue: state.get('roster').size
            },
            {
                component: <EditTeam />,
                key: 'edit', name: 'Edit Team',
                notifyValue: state.get('waiting').size
            }
        ]
    }
}
export default connect(mapStateToProps)(SubMenu);