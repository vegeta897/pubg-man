import React, { PureComponent } from 'react';
import immutable from 'immutable';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { GenerateTeamName } from './../gameModel';
import CreateTeam from './CreateTeam';
import EditTeam from './EditTeam';
import { Container, Menu, Label } from 'semantic-ui-react';

class Teams extends PureComponent {
    showDetail = () => this.setState({ open: true });
    closeDetail = () => this.setState({ open: false });
    state = { activeTab: 'create' };
    changeTab = (e, { name }) => this.setState({ activeTab: name });
    showTab = tab => {
        switch(tab) {
            case 'create': return <CreateTeam />;
            case 'edit': return <EditTeam />;
            default: return null;
        }
    };
    selectPlayer = username => (() => {
        let action = this.state.selectedPlayers.has(username) ? 'remove' : 'add';
        this.setState({ selectedPlayers: this.state.selectedPlayers[action](username) });
    });
    generateTeamName = () => this.setState({ teamName: GenerateTeamName(this.props.teams) });
    createTeam = () => {
        this.props.dispatch(Actions.createTeam(this.state.selectedPlayers, this.state.teamName));
        this.setState({ selectedPlayers: immutable.Set(), open: false });
        this.generateTeamName();
    };
    render() {
        if(!this.props.display) return null;
        const { activeTab } = this.state;
        return (
            <Container className='Teams'>
                <Menu size="huge" pointing secondary>
                    <Menu.Item name="create" active={activeTab === 'create'} onClick={this.changeTab}>
                        Create Team
                        {
                            !this.props.roster.size ? null :
                                <Label circular color="green" size="large" content={this.props.roster.size} />
                        }

                    </Menu.Item>
                    <Menu.Item name="edit" active={activeTab === 'edit'} onClick={this.changeTab}>
                        Edit Team
                    </Menu.Item>
                </Menu>
                {this.showTab(activeTab)}
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        ...props,
        roster: state.get('roster').map(player => {
            return state.getIn(['players', 'byId', player]);
        }),
        teams: state.get('waiting').map(teamName => {
            return { teamName, members: state.getIn(['teams',teamName]) }
        })
    }
}
export default connect(mapStateToProps)(Teams);