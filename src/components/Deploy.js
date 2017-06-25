import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Container, Table, List, Button, Progress, Header } from 'semantic-ui-react';

class Deploy extends PureComponent {
    deployTeam = (teamName) => (() => {
        this.props.dispatch(Actions.deployTeam(teamName))
    });
    render() {
        let key = 0;
        let teamList = this.props.teams.map(({teamName, members }) => {
            return (
                <Table.Row key={key++}>
                    <Table.Cell>
                        <Button size="large" color="red" circular icon="share" onClick={this.deployTeam(teamName)} />
                    </Table.Cell>
                    <Table.Cell>
                        <Header as="h3" content={teamName} />
                        {members.toJS().join(' · ')}
                        </Table.Cell>
                </Table.Row>
            );
        });
        key = 0;
        let deployList = this.props.deployed.entrySeq().map(([teamName, { startTick }]) => {
            return (
                <List.Item key={key++}>
                    <List.Content>
                        <List.Header content={teamName} />
                        <Progress indicating percent={ (this.props.tick - startTick) } />
                    </List.Content>
                </List.Item>
            );
        });
        // TODO: Fix dropdown cutting off at bottom of container
        return (
            <Container className="deploy">
                <Table sortable celled selectable padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing textAlign="center" content="Deploy" />
                            <Table.HeaderCell content="Team" />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body children={teamList}/>
                </Table>
                <List children={deployList} />
            </Container>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        teams: state.get('waiting').map(teamName => {
            return { teamName, members: state.getIn(['teams',teamName]) }
        }),
        deployed: state.get('deployed'),
        tick: state.getIn(['global','tick']),
        noTeams: state.get('waiting').isEmpty()
    }
}
export default connect(mapStateToProps)(Deploy);