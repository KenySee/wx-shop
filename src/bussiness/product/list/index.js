import React from 'react';
import { observable,action} from 'mobx'
import { observer } from 'mobx-react'
import { ListView } from 'antd-mobile';
import {API,LoadingView,MoneyText} from 'components'
import Dotdotdot from 'react-dotdotdot'
import './index.scss'
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.productId !== r2.productId });
@observer
class ProductList extends React.Component {
    data = observable({

        pageNum: 1,
        sortStamp:0,
        rows:observable.shallow(null),
        isRefreshing: false,
        gridStyle: false,
        paginationStatus: 'onceLoad',
        fetchEnd: observable.ref(action.bound(function(data) {
            if(this.rows == null) this.rows = [];
            this.loading = false;
            this.pageNum = data.pager.pageIndex;
            if(data.list && data.list.length > 0){
                const status = this.pageNum <= 1 && data.list.length<10 ? 'onceLoad' : 'firstLoad';
                this.paginationStatus = status;
                this.rows = this.rows.concat(data.list);
            }
            else{
                this.paginationStatus = 'allLoaded';
            }
        }))
    })
    componentDidMount() {
        const {params} = this.props;
        API.AppProduct_list_product({...params,pageNum:1,pageSize:20}).then((response)=>{
            this.data.fetchEnd(response.data);
        })
    }
    onEndReached = (event) => {

    }
    renderFooterView = () => {
        if(this.data.paginationStatus == 'firstLoad'){
            return (
                <div style={{ padding: 30, textAlign: 'center' }}>
                    Loading...
                </div>
            )
        }
        else{
            if(this.data.paginationStatus == 'onceLoad'){
                return null;
            }
            else{
                return (
                    <div style={{ padding: 30, textAlign: 'center' }}>
                        Loaded
                    </div>
                )
            }
        }
    }
    renderRowView = (item) => {
        if(this.data.gridStyle){
            return (
                <div className="item-col2">
                    <img src={item.productImg+'?imageView/1/w/375/h/375'}/>
                    <div className="desc">
                        <div className="name">
                            <span className="red">自营</span>
                            <Dotdotdot clamp={1} className="text">{item.productName}</Dotdotdot>
                        </div>
                        <MoneyText money={item.productPrice} bigFont="0.32rem" smallFont="0.24rem"  style={{marginTop: '0.10rem',marginBottom: '0.10rem'}}/>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="item-col1">
                    <div className="image">
                        <img src={item.productImg+'?imageView/1/w/375/h/375'}/>
                    </div>
                    <div className="desc">
                        <Dotdotdot clamp={2} className="text">{item.productName}{item.productName}{item.productName}{item.productName}{item.productName}</Dotdotdot>
                        <span className="red">自营</span>
                        <div className="price">
                            <MoneyText money={item.productPrice} bigFont="0.30rem" smallFont="0.22rem"  style={{marginTop: '0rem',marginBottom: '0.10rem'}}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
    renderListView = ({items}) => {
        return (
            <ListView dataSource={ds.cloneWithRows(items.slice())}
                      renderFooter={this.renderFooterView}
                      renderRow={this.renderRowView}
                      pageSize={20}
                      scrollEventThrottle={200}
                      onEndReached={this.onEndReached}/>
        )
    }
    renderFilterBar = () => {
        return (
            <div className="appBar">
                <div className="barItem red">
                    <span>综合</span>
                </div>
                <div className="barItem">
                    <span>销量</span>
                    <div className="arrow">
                        <div className="up"></div>
                        <div className="down red"></div>
                    </div>
                </div>
                <div className="barItem">
                    <span>价格</span>
                    <div className="arrow">
                        <div className="up"></div>
                        <div className="down red"></div>
                    </div>
                </div>
                <div className="otherItem">
                    <div className="toggleButton">
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="pro_list">
                <this.renderFilterBar/>
                <LoadingView component={this.renderListView} items={this.data.rows} height="4rem"/>
            </div>
        );
    }
}
export default ProductList