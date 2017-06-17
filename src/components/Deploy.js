import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Dropdown, Button } from 'semantic-ui-react';

class Deploy extends Component {
    deployTeam = (team) => (() => {
        console.log('deploying',team);
    });
    render() {
        let key = 0;
        let teamList = this.props.teams.entrySeq().map(([teamName, team]) => {
            return (
                <Dropdown.Item key={key++} text={teamName} onClick={this.deployTeam(teamName)} />
            );
        });
        return (
            <Card fluid className='Deploy'>
                <Card.Content>
                    <Card.Header content="Deploy" />
                    <Card.Description>
                        <Card.Content>
                            <Button.Group color='teal'>
                                <Dropdown button floating text="Choose Team" disabled={this.props.noTeams}>
                                    <Dropdown.Menu children={teamList} />
                                </Dropdown>
                            </Button.Group>
                        </Card.Content>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
function mapStateToProps(state, props) { // 'props' is passed in by parent component
    return {
        teams: state.get('teams'),
        noTeams: state.get('teams').isEmpty()
    }
}
export default connect(mapStateToProps)(Deploy);