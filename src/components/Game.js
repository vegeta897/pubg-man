import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import LFG from './LFG';
import Roster from './Roster';
import { Grid } from 'semantic-ui-react';

class Game extends Component {
    componentDidMount() { // https://stackoverflow.com/a/36299242/2612679
        this.props.actions.startTick();
    }
    componentWillUnmount() {
        this.props.actions.stopTick();
    }
    render() {
        return (
            <Grid columns={3} className="Game">
                <Grid.Row>
                    <Grid.Column>
                        Tick: {this.props.global.tick}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <LFG />
                    </Grid.Column>
                    <Grid.Column>
                        <Roster />
                    </Grid.Column>
                    <Grid.Column>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        global: state.get('global').toJS()
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);