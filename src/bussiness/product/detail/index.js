import React from 'react';
import { observable,action} from 'mobx'
import { observer } from 'mobx-react'
import './index.scss'
import {Iconfont} from 'components'

export const productState = observable({
    currentPath: ''
})
@observer
class ProductDetail extends React.Component {
    componentDidMount() {
        window.appHistory.listen((e) => {
            this.onPathChange()
        })
    }
    onPathChange = () => {
        let path = window.appHistory.getCurrentLocation().pathname.split('/');
        if(path[0] == 'product'){
            productState.currentPath = path[1];
        }
    }
    onClickTabItem = (path) => {
        const {params} = this.props;
        productState.currentPath = path;
        if(path == 'tab2'){
            path = 'tab2/tab21';
        }
        window.appHistory.push(`product/${path}/${params.productId}`);
    }
    render(){
        const {currentPath} = productState;
        return (
            <div className="pro_detail">
                <div className="tabBar">
                    <div className="tabContainer">
                        <div className={"tabItem "+(currentPath=='tab1' ? 'active' : '')} onClick={()=>{this.onClickTabItem('tab1')}}>商品</div>
                        <div className={"tabItem "+(currentPath=='tab2' ? 'active' : '')} onClick={()=>{this.onClickTabItem('tab2')}}>详情</div>
                        <div className={"tabItem "+(currentPath=='tab3' ? 'active' : '')} onClick={()=>{this.onClickTabItem('tab3')}}>评价</div>
                    </div>
                </div>
                <div className='content'>
                    {this.props.children}
                </div>
                <div className="bottomBar">
                    <div className="widget">
                        <div className="item">
                            <Iconfont className="icon" type={require('svg/pro_detail/spxq_icon_dp.svg')}/>
                            <div className="text">店铺</div>
                        </div>
                        <div className="item">
                            <Iconfont className="icon" type={require('svg/pro_detail/spxq_icon_gz_kx.svg')}/>
                            <div className="text">关注</div>
                        </div>
                        <div className="item">
                            <Iconfont className="icon" type={require('svg/pro_detail/spxq_icon_gwc.svg')}/>
                            <div className="text">购物车</div>
                        </div>
                    </div>
                    <div className="car_pay">
                        <div className="car">加入购物车</div>
                        <div className="pay">立即购买</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDetail