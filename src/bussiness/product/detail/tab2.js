import React from 'react';
import { observable,action} from 'mobx'
import { observer } from 'mobx-react'
export const productTab2State = observable({
    currentPath: ''
})
@observer
class Tab2 extends React.Component {
    componentDidMount() {
        window.appHistory.listen((e) => {
            this.onHistoryChange()
        })
    }
    onHistoryChange = () => {
        let path = window.appHistory.getCurrentLocation().pathname.split('/');
        if(path[1] == 'tab2'){
            productTab2State.currentPath = path[2];
        }
    }
    onTabClick = (path) => {
        const {params} = this.props;
        productTab2State.currentPath = path;
        window.appHistory.push(`product/tab2/${path}/${params.productId}`);
    }
    render() {
        const {currentPath} = productTab2State;
        return (
            <div className="tab2">
                <div className="proTab">
                    <div className="tabContainer">
                        <div className={"tabItem "+(currentPath=='tab21' ? 'active' : '')} onClick={()=>{this.onTabClick('tab21')}}>商品介绍</div>
                        <div className={"tabItem "+(currentPath=='tab22' ? 'active' : '')} onClick={()=>{this.onTabClick('tab22')}}>规格参数</div>
                    </div>
                </div>
                <div className="proContent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Tab2