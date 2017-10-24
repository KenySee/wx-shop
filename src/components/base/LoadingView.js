import React,{PureComponent,PropTypes} from 'react'
import './LoadingView.scss'
import {__assign} from '../index'

export default class LoadingView extends PureComponent {
    static defaultProps = {
        items:null,
        backgroundColor: '#f4f4f4',
        height:'100%',
        width:'100%',
        emptyText: '没有数据'
    }
    static propTypes = {
        items: PropTypes.array,
        backgroundColor: PropTypes.string,
        children: PropTypes.node,
        height: PropTypes.any,
        width: PropTypes.any,
        emptyText: PropTypes.string
    }
    getProps() {
        const props = {};
        Object.keys(this.props).forEach(prop => {
            if (["emptyText", "children", "component"].indexOf(prop) === -1) {
                props[prop] = this.props[prop];
            }
        });
        return props;
    }
    render(){
        const props = this.getProps();
        const {backgroundColor,items,data,width,height,emptyText,children,component} = this.props;
        const Component = component;
        if(!items && !data){
            return (
                <div className="loadingView" style={{backgroundColor,width,height}}>
                    <div className="container">
                        <span className="text">加载中...</span>
                    </div>
                </div>
            )
        }
        else if(items && items.length == 0 || data && JSON.stringify(data) == "{}"){
            return (
                <div className="loadingView" style={{backgroundColor,width,height}}>
                    <div className="container" >
                        <span className="text">{emptyText}</span>
                    </div>
                </div>
            )
        }
        else {
            return React.createElement(Component, __assign({}, props), children);
        }
    }
}