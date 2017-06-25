import React from 'react';
import { connect } from 'react-redux';
import SubMenu from './SubMenu';
import Deploy from './Deploy';
import Map from './Map';

function mapStateToProps(state, props) {
    return {
        ...props,
        initialTab: 'deploy',
        className: 'Matches',
        color: 'red',
        tabs: [
            {
                component: <Deploy />,
                key: 'deploy', name: 'Deploy',
                notifyValue: state.get('waiting').size
            },
            {
                component: <Map />,
                key: 'map', name: 'Map'
            }
        ]
    }
}
export default connect(mapStateToProps)(SubMenu);