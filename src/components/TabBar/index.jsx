import React from 'react'
import { observer } from 'mobx-react'

import './index.scss'

@observer
class TabBar extends React.Component {
    constructor(props) {
        super(props)
    }
    getTabBarItem(children, container) {
        return children.map((item) => {
            return <div className={item.key == container.selectedTab ? 'item selected' : 'item'} onClick={item.onClick}>
                <i className="icon" style={{ 'background': 'url(' + (item.key == container.selectedTab ? item.activeIcon : item.normalIcon) + ') center center/contain no-repeat' }}><i></i></i>
                <span>{item.title}</span>
            </div>
        })
    }
    render() {
        const {container, children} = this.props
        return (
            <div className="tabBar">
                {this.getTabBarItem(children, container)}
            </div>
        )
    }
}

export default TabBar