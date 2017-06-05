import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Card, Icon, Popup, Modal, Table, Button } from 'semantic-ui-react';

class LFG extends Component {
    showDetail = () => !this.state.noPlayers && this.setState({ open: true });
    closeDetail = () => this.setState({ open: false });
    recruitPlayer = (username) => (() => {
        this.props.dispatch(Actions.addToRoster(username))
    });
    constructor(props) {
        super(props);
        this.state = { open: false, noPlayers: true };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ noPlayers: nextProps.players.isEmpty() });
    }
    render() {
        let lfgIcons = this.props.players.map((player, idx) => {
            return <Popup key={idx} trigger={<Icon circular name="user" />}
                          content={player.username}
                          inverted position="bottom left"
            />
        });
        if(this.state.noPlayers) {
            lfgIcons = lfgIcons.add(
                <span key={0}>None</span>
            )
        }
        let lfgDetail = this.props.players.map(({ username }, idx) => {
            return <Table.Row key={idx}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>Just a player</Table.Cell>
                <Table.Cell textAlign="center">
                    <Button icon="plus" onClick={this.recruitPlayer(username)} />
                </Table.Cell>
            </Table.Row>
        });
        return (
            <div>
                <Card fluid onClick={this.state.noPlayers ? null : this.showDetail}
                      color={this.state.noPlayers ? null : 'orange'}
                      className={this.state.noPlayers ? null : 'bright-orange'}>
                    <Card.Content>
                        <Card.Header>
                            Looking for Group
                        </Card.Header>
                        <Card.Meta>
                            Players you can recruit
                        </Card.Meta>
                        <Card.Description>
                            {lfgIcons}
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Modal open={!this.state.noPlayers && this.state.open}
                       onClose={this.closeDetail} dimmer="inverted">
                    <Modal.Header>Looking for Group</Modal.Header>
                    <Modal.Content>
                        <Table sortable celled>
                            {/* TODO: https://react.semantic-ui.com/collections/table#table-example-sortable */}
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign="center">Recruit</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {lfgDetail}
                            </Table.Body>
                        </Table>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        players: state.get('lfg').map(player => {
            return state.getIn(['players', 'byId', player]);
        })
    }
}
export default connect(mapStateToProps)(LFG);