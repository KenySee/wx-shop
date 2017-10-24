import React from 'react';
import { observable,action} from 'mobx'
import {Toast} from 'antd-mobile';
import { observer } from 'mobx-react'

import './index.scss'

@observer
class Setting extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="setting">
            </div>
        )
    }
}

export default Setting