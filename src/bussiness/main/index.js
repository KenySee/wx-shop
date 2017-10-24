import React from 'react'
import { observer } from 'mobx-react'

import {TabBar} from '../../components'
import indexState from './index.state'

import './index.scss'


@observer
class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // window.indexState = indexState
        // this.setTabBarStatus()
        // window.appHistory.listen((e) => {
        //     this.setTabBarStatus()
        // })
    }

    setTabBarStatus() {
        // let pathName = window.appHistory.getCurrentLocation().pathname.replace(/^\//,'')
        // if(pathName.indexOf('main')){
        //     indexState.tabBarConfig.container.selectedTab = pathName
        // }
        // if (pathName.indexOf('login') == -1) {
        //     indexState.tabBarConfig.container.hidden = false
        // } else {
        //     indexState.tabBarConfig.container.hidden = true
        // }
    }

    render() {
        return (
            <div className='main'>
                <div className='content'>
                    {this.props.children}
                </div>
                <TabBar {...indexState.tabBarConfig}>
                </TabBar>
            </div>
        )
    }
}

export default Main