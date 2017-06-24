import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, List } from 'semantic-ui-react';

class EditTeam extends PureComponent {
    state = { };
    render() {
        let key = 0;
        let teamList = this.props.teams.map(({teamName, members}) => {
            return (
                <List.Item key={key++}>
                    <List.Content>
                        <List.Header content={teamName} />
                        {members.toJS().join(' · ')}
                    </List.Content>
                </List.Item>
            );
        });
        return (
            <Container className='Teams'>
                {
                    this.props.noTeams ? 'You have no teams' :
                        <List size="huge" divided selection children={teamList} />
                }
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        roster: state.get('roster').map(player => {
            return state.getIn(['players', 'byId', player]);
        }),
        teams: state.get('waiting').map(teamName => {
            return { teamName, members: state.getIn(['teams',teamName]) }
        }),
        noTeams: state.get('waiting').isEmpty(),
        noFreePlayers: state.get('roster').isEmpty()
    }
}
export default connect(mapStateToProps)(EditTeam);