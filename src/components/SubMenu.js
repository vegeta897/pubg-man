import React, { PureComponent } from 'react'
import { Menu, Label } from 'semantic-ui-react';
import { getWidth } from 'viewport-size';
import scrollToElement from 'scroll-to-element';

class SubMenu extends PureComponent {
    state = { activeTab: this.props.initialTab };
    changeTab = (e, { name }) => {
        this.setState({ activeTab: name });
        if(getWidth() < 768) setTimeout(() => scrollToElement('.GameContent', { duration: 500 }),1);
    };
    showTab = tab => {
        for(let i = 0; i < this.props.tabs.length; i++) {
            if(this.props.tabs[i].key === tab) return this.props.tabs[i].component;
        }
        return null;
    };
    render() {
        if(!this.props.display) return null;
        const { className, color, tabs } = this.props;
        const { activeTab } = this.state;
        return (
            <div className={className}>
                <Menu size="huge" pointing secondary>
                    {tabs.map((tab, idx) => {
                        return <Menu.Item key={idx} name={tab.key} active={activeTab === tab.key} onClick={this.changeTab}>
                            {tab.name}
                            {
                                !tab.notifyValue ? null :
                                    <Label circular color={color} size="large" content={tab.notifyValue} />
                            }
                        </Menu.Item>
                    })}
                </Menu>
                {this.showTab(activeTab)}
            </div>
        )
    }
}

export default SubMenu