import React, { Component } from 'react';
import immutable from 'immutable';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Card, List, Button, Modal, Table, Checkbox, Label } from 'semantic-ui-react';

class Teams extends Component {
    showDetail = () => this.setState({ open: true });
    closeDetail = () => this.setState({ open: false });
    constructor(props) {
        super(props);
        this.state = { selectedPlayers: immutable.Set() };
    }
    selectPlayer = username => (() => {
        let action = this.state.selectedPlayers.has(username) ? 'remove' : 'add';
        this.setState({ selectedPlayers: this.state.selectedPlayers[action](username) });
    });
    createTeam = () => {
        this.props.dispatch(Actions.createTeam(this.state.selectedPlayers));
        this.setState({ selectedPlayers: immutable.Set(), open: false });
    };
    render() {
        let teamList = this.props.teams.toJS().map((team, idx) => {
            return <List.Item icon="users" content={team.join(' · ')} key={idx} />;
        });
        let rosterDetail = this.props.roster.toJS().map(({ username }, idx) => {
            return <Table.Row className="clickable" key={idx} 
                              positive={this.state.selectedPlayers.has(username)}
                              disabled={this.state.selectedPlayers.size === 4
                              && !this.state.selectedPlayers.has(username)}
                              onClick={this.selectPlayer(username)}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>Just a player</Table.Cell>
                <Table.Cell textAlign="center"><a>
                    <Checkbox fitted onChange={this.selectPlayer(username)}
                              checked={this.state.selectedPlayers.has(username)}
                              readOnly={this.state.selectedPlayers.size === 4
                              && !this.state.selectedPlayers.has(username)} />
                </a></Table.Cell>
            </Table.Row>
        });
        return (
            <div className='Teams'>
            <Card fluid>
                <Card.Content>
                    {this.props.teams.size > 0 &&
                    <Label circular floating content={this.props.teams.size}
                           color="green" size="large" />}
                    <Card.Header content="Teams" />
                    <Card.Meta content="Your teams" />
                    <Card.Description content={this.props.noTeams ? 'None' : <List children={teamList} />} />
                </Card.Content>
                <Card.Content extra>
                    <Button icon="plus" positive content="Create" 
                            onClick={this.showDetail} disabled={this.props.noFreePlayers} />
                </Card.Content>
            </Card>
            <Modal open={!this.props.noFreePlayers && this.state.open}
                   onClose={this.closeDetail} dimmer="inverted">
                <Modal.Header content="Create a Team" />
                <Modal.Content className="zero-padding">
                    <Table sortable celled selectable padded className="no-border">
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
        teams: state.get('teams'),
        noTeams: state.get('teams').isEmpty(),
        noFreePlayers: state.get('roster').isEmpty()
    }
}
export default connect(mapStateToProps)(Teams);