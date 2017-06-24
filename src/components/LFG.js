import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Table, Button, Header } from 'semantic-ui-react';

class LFG extends PureComponent {
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
        let lfgDetail = this.props.players.toJS().map(({ username }) => {
            return <Table.Row key={key++}>
                <Table.Cell singleLine>
                    <Button color="orange" circular icon="plus" onClick={this.recruitPlayer(username)} /> {username}
                    </Table.Cell>
                <Table.Cell>Just a player</Table.Cell>
            </Table.Row>
        });
        return (
            <div className='LFG'>
                <Header size="medium">Looking for Group</Header>
                <Table sortable celled selectable padded>
                    {/* TODO: https://react.semantic-ui.com/collections/table#table-example-sortable */}
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing content="Recruit" />
                            <Table.HeaderCell content="Description" />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body children={lfgDetail} />
                </Table>
                <Button disabled={noPlayers} positive icon="users" labelPosition='right' content="Recruit All" onClick={this.recruitAll} />
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