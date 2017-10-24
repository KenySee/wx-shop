import React from 'react'
import { observer } from 'mobx-react'
import './index.scss'


@observer
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="app">
                {this.props.children}
            </div>
        )
    }
}

export default App