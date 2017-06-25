import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Container, Dropdown, List, Button, Progress } from 'semantic-ui-react';

class Deploy extends PureComponent {
    deployTeam = (teamName) => (() => {
        this.props.dispatch(Actions.deployTeam(teamName))
    });
    render() {
        let key = 0;
        let teamList = this.props.teams.map(teamName => {
            return (
                <Dropdown.Item key={key++} text={teamName} onClick={this.deployTeam(teamName)} />
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
                <Button.Group color={this.props.noTeams ? null : 'teal'}>
                    <Dropdown button floating text="Choose Team" disabled={this.props.noTeams}>
                        <Dropdown.Menu children={teamList} />
                    </Dropdown>
                </Button.Group>
                <List children={deployList} />
            </Container>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        teams: state.get('waiting'),
        deployed: state.get('deployed'),
        tick: state.getIn(['global','tick']),
        noTeams: state.get('waiting').isEmpty()
    }
}
export default connect(mapStateToProps)(Deploy);