import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LFG from './LFG';
import Roster from './Roster';
import { Menu, Label } from 'semantic-ui-react';

class Players extends PureComponent {
    state = { activeTab: 'lfg' };
    changeTab = (e, { name }) => this.setState({ activeTab: name });
    showTab = tab => {
        switch(tab) {
            case 'lfg': return <LFG />;
            case 'roster': return <Roster />;
            default: return null;
        }
    };
    render() {
        if(!this.props.display) return null;
        const { activeTab } = this.state;
        return (
            <div className="Players">
                <Menu size="huge" pointing secondary>
                    <Menu.Item name="lfg" active={activeTab === 'lfg'} onClick={this.changeTab}>
                        LFG
                        {
                            !this.props.lfgCount ? null : 
                                <Label circular color="orange" size="large" content={this.props.lfgCount} />
                        }
                        
                    </Menu.Item>
                    <Menu.Item name="roster" active={activeTab === 'roster'} onClick={this.changeTab}>
                        Roster
                    </Menu.Item>
                </Menu>
                {this.showTab(activeTab)}
            </div>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        ...props,
        lfgCount: state.get('lfg').size,
        recruited: !state.get('roster').isEmpty() || !state.get('teams').isEmpty(),
        teamed: !state.get('teams').isEmpty()
    }
}
export default connect(mapStateToProps)(Players);