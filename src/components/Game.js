import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import LFG from './LFG';
import Roster from './Roster';
import Teams from './Teams';
import Deploy from './Deploy';
import Map from './Map';
import { Grid, Step } from 'semantic-ui-react';

class Game extends Component {
    componentDidMount() { // https://stackoverflow.com/a/36299242/2612679
        this.props.dispatch(Actions.startTick());
    }
    componentWillUnmount() {
        this.props.dispatch(Actions.stopTick());
    }
    render() {
        return (
            <Grid columns="equal" className="Game">
                <Grid.Row>
                    <Grid.Column>
                        <Step.Group fluid ordered>
                            <Step title="Recruit" description="Add players to your roster"
                                  completed={this.props.recruited} />
                            <Step title="Team Up" description="Create teams with your players"
                                  completed={this.props.teamed} />
                            <Step title="Deploy" description="Send your teams out into battle" />
                        </Step.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <LFG />
                        <Roster />
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.recruited && <Teams />}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.teamed && <Deploy />}
                        {this.props.teamed && <Map />}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        recruited: !state.get('roster').isEmpty() || !state.get('teams').isEmpty(),
        teamed: !state.get('teams').isEmpty()
    }
}
export default connect(mapStateToProps)(Game);