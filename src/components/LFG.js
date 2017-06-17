import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Card, Icon, Popup, Modal, Table, Button, Label } from 'semantic-ui-react';

class LFG extends Component {
    showDetail = () => !this.props.noPlayers && this.setState({ open: true });
    closeDetail = () => this.setState({ open: false });
    recruitPlayer = username => (() => {
        this.props.dispatch(Actions.addToRoster(username))
    });
    recruitAll = () => {
        this.props.players.forEach(player => this.props.dispatch(Actions.addToRoster(player.username)));
        this.setState({ open: false });
    };
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    render() {
        const { noPlayers } = this.props;
        let key = 0;
        let lfgIcons = this.props.players.map(player => {
            return <Popup key={key++} trigger={<Icon circular name="user" />}
                          content={player.username} inverted position="bottom left"
            />
        });
        key = 0;
        let lfgDetail = this.props.players.toJS().map(({ username }) => {
            return <Table.Row key={key++}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>Just a player</Table.Cell>
                <Table.Cell textAlign="center">
                    <Button icon="plus" onClick={this.recruitPlayer(username)} />
                </Table.Cell>
            </Table.Row>
        });
        return (
            <div className='LFG'>
            <Card fluid onClick={noPlayers ? null : this.showDetail}
                  color={noPlayers ? null : 'orange'} className={noPlayers ? null : 'bright-orange'}>
                <Card.Content>
                    {this.props.players.size > 0 &&
                    <Label circular floating content={this.props.players.size}
                           color="orange" size="large" />}
                    <Card.Header>
                        Looking for Group 
                    </Card.Header>
                    <Card.Meta content="Players you can recruit" />
                    <Card.Description content={noPlayers ? 'None' : lfgIcons} />
                </Card.Content>
            </Card>
            <Modal open={!noPlayers && this.state.open} onClose={this.closeDetail} dimmer="inverted">
                <Modal.Header content="Looking for Group" />
                <Modal.Content className="zero-padding">
                    <Table sortable celled selectable padded className="no-border">
                        {/* TODO: https://react.semantic-ui.com/collections/table#table-example-sortable */}
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={3} content="Name" />
                                <Table.HeaderCell content="Description" />
                                <Table.HeaderCell collapsing textAlign="center" content="Recruit" />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body children={lfgDetail} />
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Close" onClick={this.closeDetail} />
                    <Button positive icon="users" labelPosition='right' content="Recruit All" onClick={this.recruitAll} />
                </Modal.Actions>
            </Modal>
            </div>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        players: state.get('lfg').map(player => {
            return state.getIn(['players', 'byId', player]);
        }),
        noPlayers: state.get('lfg').isEmpty()
    }
}
export default connect(mapStateToProps)(LFG);