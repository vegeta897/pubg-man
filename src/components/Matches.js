import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Deploy from './Deploy';
import Map from './Map';
import { Menu, Label } from 'semantic-ui-react';

class Matches extends PureComponent {
    state = { activeTab: 'deploy' };
    changeTab = (e, { name }) => this.setState({ activeTab: name });
    showTab = tab => {
        switch(tab) {
            case 'deploy': return <Deploy />;
            case 'map': return <Map />;
            default: return null;
        }
    };
    render() {
        if(!this.props.display) return null;
        const { activeTab } = this.state;
        return (
            <div className="Matches">
                <Menu size="huge" pointing secondary>
                    <Menu.Item name="deploy" active={activeTab === 'deploy'} onClick={this.changeTab}>
                        Deploy
                        {
                            !this.props.teams.size ? null :
                                <Label circular color="red" size="large" content={this.props.teams.size} />
                        }
                    </Menu.Item>
                    <Menu.Item name="map" active={activeTab === 'map'} onClick={this.changeTab}>
                        Map
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
        teams: state.get('waiting')
    }
}
export default connect(mapStateToProps)(Matches);