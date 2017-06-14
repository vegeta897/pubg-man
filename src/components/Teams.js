import React, { Component } from 'react';
import immutable from 'immutable';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Card, List, Button, Modal, Table, Checkbox } from 'semantic-ui-react';

class Teams extends Component {
    showDetail = () => this.setState({ open: true });
    closeDetail = () => this.setState({ open: false });
    refreshState = props => {
        this.setState({ noTeams: props.teams.isEmpty(), noFreePlayers: props.roster.isEmpty() });
    };
    constructor(props) {
        super(props);
        this.state = { noTeams: true, noFreePlayers: true, selectedPlayers: immutable.Set() };
    }
    selectPlayer = username => ((event, { checked }) => {
        let action = checked ? 'add' : 'remove';
        this.setState({ selectedPlayers: this.state.selectedPlayers[action](username) });
    });
    createTeam = () => {
        this.props.dispatch(Actions.createTeam(this.state.selectedPlayers));
        this.setState({ selectedPlayers: immutable.Set(), 
            open: this.props.roster.size > this.state.selectedPlayers.size });
    };
    componentWillMount = () => this.refreshState(this.props);
    componentWillReceiveProps = nextProps => this.refreshState(nextProps);
    render() {
        let teamList = this.props.teams.toJS().map((team, idx) => {
            return <List.Item icon="user" content={team.join(' · ')} key={idx} />;
        });
        if(this.state.noTeams) teamList.push(<List.Item key={0} content="None" />);
        let rosterDetail = this.props.roster.toJS().map(({ username }, idx) => {
            return <Table.Row key={idx} positive={this.state.selectedPlayers.has(username)}
                              disabled={this.state.selectedPlayers.size === 4
                              && !this.state.selectedPlayers.has(username)}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>Just a player</Table.Cell>
                <Table.Cell textAlign="center">
                    <Checkbox fitted onChange={this.selectPlayer(username)}
                              checked={this.state.selectedPlayers.has(username)}
                              readOnly={this.state.selectedPlayers.size === 4
                              && !this.state.selectedPlayers.has(username)} />
                </Table.Cell>
            </Table.Row>
        });
        return (
            <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header content="Teams" />
                    <Card.Meta content="Your teams" />
                    <Card.Description>
                        <List children={teamList} />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button icon="plus" positive content="Create" 
                            onClick={this.showDetail} disabled={this.state.noFreePlayers} />
                </Card.Content>
            </Card>
            <Modal open={!this.state.noFreePlayers && this.state.open}
                   onClose={this.closeDetail} dimmer="inverted">
                <Modal.Header content="Create a Team" />
                <Modal.Content className="zero-padding">
                    <Table sortable celled padded className="no-border">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={3} content="Nameg" />
                                <Table.HeaderCell content="Description" />
                                <Table.HeaderCell collapsing textAlign="center" content="Select" />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body children={rosterDetail} />
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Cancel" onClick={this.closeDetail} />
                    <Button positive icon="users" labelPosition='right' content="Create Team" 
                            disabled={this.state.selectedPlayers.isEmpty()} onClick={this.createTeam} />
                </Modal.Actions>
            </Modal>
            </div>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        roster: state.get('roster').map(player => {
            return state.getIn(['players', 'byId', player]);
        }),
        teams: state.get('teams')
    }
}
export default connect(mapStateToProps)(Teams);