import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import * as Actions from '../actions';
import { GenerateTeamName } from './../gameModel';
import { Container, Button, Table, Checkbox, Input } from 'semantic-ui-react';

class CreateTeam extends PureComponent {
    state = { selectedPlayers: immutable.Set(), teamName: GenerateTeamName(this.props.teams) };
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
        const { selectedPlayers } = this.state;
        let key = 0;
        let rosterDetail = this.props.roster.map(({ username }) => {
            return <Table.Row className="clickable" key={key++} positive={selectedPlayers.has(username)} disabled={selectedPlayers.size === 4
            && !selectedPlayers.has(username)} onClick={this.selectPlayer(username)}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>Just a player</Table.Cell>
                <Table.Cell textAlign="center"><a>
                    <Checkbox fitted onChange={this.selectPlayer(username)} checked={selectedPlayers.has(username)} readOnly={selectedPlayers.size === 4
                    && !selectedPlayers.has(username)}/>
                </a></Table.Cell>
            </Table.Row>
        });
        return (
            <Container className='Teams'> <Input type='text' placeholder={this.state.teamName} label={{
                basic: true,
                content: 'Team'
            }} action={{ icon: 'random', onClick: this.generateTeamName }}/> <Table sortable celled selectable padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3} content="Name"/>
                        <Table.HeaderCell content="Description"/>
                        <Table.HeaderCell collapsing textAlign="center" content="Select"/>
                    </Table.Row>
                </Table.Header>
                <Table.Body children={rosterDetail}/> </Table>
                <Button positive icon="users" labelPosition='right' content="Create Team" disabled={selectedPlayers.isEmpty()} onClick={this.createTeam}/>
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
export default connect(mapStateToProps)(CreateTeam);