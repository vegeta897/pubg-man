import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Players from './Players';
import Teams from './Teams';
import Matches from './Matches';
import { Menu, Label } from 'semantic-ui-react';
import { capitalize } from './../util';

class Game extends PureComponent {
    componentDidMount() { // https://stackoverflow.com/a/36299242/2612679
        this.props.dispatch(Actions.startTick());
    }
    componentWillUnmount() {
        this.props.dispatch(Actions.stopTick());
    }
    state = { activeTab: 'players' };
    createTab = (tab, color, notifyCount, notifyType) => {
        const { activeTab } = this.state;
        return (
            <Menu.Item name={tab} color={color} active={activeTab === tab} onClick={this.changeTab}>
                {capitalize(tab)}
                {
                    activeTab === tab || !notifyCount ? null :
                    <Label attached="bottom" color={color} size="large">
                        {notifyCount}
                        <Label.Detail>{notifyType}{notifyCount > 1 ? 's' : ''}</Label.Detail>
                    </Label>
                }
        </Menu.Item>
        )
    };
    changeTab = (e, { name }) => this.setState({ activeTab: name });
    // TODO: Implement "display" prop on all views for persistent state when switching sub-tabs
    // Alternatively, keep current tab & sub-tabs in store
    render() {
        const { activeTab } = this.state;
        return (
            <div className="Game">
                <Menu inverted size="massive" widths={4} stackable attached="bottom">
                    {this.createTab('players', 'orange', this.props.lfgCount, 'new recruit')}
                    {this.createTab('teams', 'green', this.props.rosterCount, 'free player')}
                    {this.createTab('matches', 'red', this.props.teamWaitingCount, 'ready team')}
                    <Menu.Item name="stats" color='grey' active={activeTab === 'stats'} onClick={this.changeTab}>
                        Stats
                    </Menu.Item>
                </Menu>
                <Players display={activeTab === 'players'} />
                <Teams display={activeTab === 'teams'} />
                <Matches display={activeTab === 'matches'} />
            </div>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        lfgCount: state.get('lfg').size,
        rosterCount: state.get('roster').size,
        teamWaitingCount: state.get('waiting').size,
        recruited: !state.get('roster').isEmpty() || !state.get('teams').isEmpty(),
        teamed: !state.get('teams').isEmpty()
    }
}
export default connect(mapStateToProps)(Game);