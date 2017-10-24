import React from 'react';
import { observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import {API,LoadingView,ImageView,MoneyText,Title} from '../../components'
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import './index.scss'
const alert = Modal.alert;
@observer
class Order extends React.Component {
    data = observable({
        orderData: null,
        logisticData: [],
    })
    componentDidMount() {
        const {params} = this.props;
        API.AppOrder_getOrderDetail(params).then((response)=>{
            this.data.orderData = response.data.order;
            let wuliuParams = {
                wuliuOrderId: this.data.orderData.logisticsNumber,
                wuliuId: this.data.orderData.logisticsId,
            }
            API.AppOrder_wuliuInfo(wuliuParams).then((response)=>{
                if(response.success) {
                    this.data.logisticData = response.data.expressInfo.traces
                }
            });
        });
    }
    componentDidUpdate() {
        //console.log("updated");
    }
    renderLogisticInfo = ({items})=> {
        console.log("items", toJS(items));
        if(items.length>0) {
            let logisticData = toJS(items)[toJS(items).length-1];
            return (
                <div className="info">
                    <div className="icon status"></div>
                    <div className="text">
                        <p style={{color: '#8caab4'}}>
                            {logisticData.acceptStation}
                        </p>
                        <p>
                            {logisticData.acceptTime}
                        </p>
                    </div>
                    <div className="link"></div>
                </div>
            )
        } else {
            <div></div>
        }

    }

    renderOrderStatus = (items)=> {

        return (
            <div className="order-status">
                <div className="banner">{stateOutput}<div className={stateClass}></div></div>
                <div className="infow">
                    {this.renderLogisticInfo(items)}
                    <div className="info">
                        <div className="icon addr"></div>
                        <div className="text">
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                               <span>收货人：{items.name}    </span>
                                <span>{items.mobile}</span>
                            </p>
                            <p>
                                收货地址：{items.addressAll}
                            </p>
                        </div>
                    </div>
                    {remarkOutput}
                </div>
            </div>
        )
    }
    renderOrderList = ({items})=> {
        let productArr = toJS(items).orderProductList;
        let productOutput = [];
        productArr.map((item)=>{
            console.log(item);
            productOutput.push(
                <div className="product">
                    <a className="img"><img src={item.productLeadLittle} /></a>
                    <div className="info">
                        <div style={{justifyContent:'space-between', display: 'flex'}}>
                            <div style={{color: '#212121'}}>{item.productName}</div>
                            <div><div style={{color: '#212121'}}> <MoneyText money={item.moneyPrice} style={{fontSize:'.26rem', color: '#212121'}}/></div>
                                {/*<div style={{color: '#878787', textDecoration: 'line-through'}}>¥8000.00</div>*/}
                            </div>
                        </div>
                        <div style={{justifyContent:'space-between', display: 'flex'}}>
                            <div style={{color: '#878787'}}>{items.specInfo}</div>
                            <div>x{item.number}</div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="orderlist">
                <div className="title">
                    <i></i>
                    <span style={{color: '#212121'}}>{items.sellerName}</span>
                </div>
                <div className="productw">
                    {productOutput}
                </div>
            </div>
        )
    }
    renderPrice = ({items})=> {
        return (
            <div className="pricew">
                <p>
                    <span>
                        商品总价
                    </span>
                    <span>
                        <MoneyText money={items.moneyProduct} style={{fontSize:'.26rem', color: '#878787'}}/>
                    </span>
                </p>
                <p>
                    <span>
                        运费（快递）
                    </span>
                    <span>
                        <MoneyText money={items.moneyLogistics} style={{fontSize:'.26rem', color: '#878787'}}/>
                    </span>
                </p>
                <p>
                    <span>
                        店铺优惠
                    </span>
                    <div style={{display:'flex'}}>
                        -  <MoneyText money={items.moneyCoupon} style={{fontSize:'.26rem', color: '#878787'}}/>
                    </div>
                </p>
                <p>
                    <span>
                        订单满减
                    </span>
                    <div style={{display:'flex'}}>
                        -  <MoneyText money={items.moneyActFull} style={{fontSize:'.26rem', color: '#878787'}}/>
                    </div>
                </p>
                <p style={{color: '#212121'}}>
                    <span>
                        商品总价
                    </span>
                    <span>
                        <MoneyText money={items.moneyOrder} style={{fontSize:'.26rem', color: '#212121'}}/>
                    </span>
                </p>
                <div className="realprice">
                    <span>
                        实付款
                    </span>
                    <span>
                        {items.moneyPaidBalance}
                    </span>
                </div>
            </div>
        )
    }
    renderOrderTime = ({items})=> {
        let orderState = items.orderState;
        let payOutPut = <div>付款时间：{items.payTime}</div>
        let deliverOutPut = <div></div>
        switch(orderState) {
            case 1:
                payOutPut = <div></div>;
                break;
            case 2:

                break;
            case 3:

                break;
            case 4:
                deliverOutPut = <p>发货时间：{items.deliverTime}</p>
                break;
            case 5:
                break;
            case 6:

                break;
        }
        return (
            <div className="timew">
                <p>订单编号：{items.orderSn} </p>
                <p>交易流水：2017040621563566646302</p>
                <p>创建时间：{items.createTime}</p>
                {payOutPut}
                {deliverOutPut}

                <p>成交时间：2017-04-17 13:51:02</p>
            </div>
        )
    }
    mainRender = ({items}) =>{

        return (
            <div className="order">

                {/*<LoadingView component={this.renderOrderStatus} items={this.data.orderData} height="5.78rem"/>*/}
                {/*<LoadingView component={this.renderOrderList} items={this.data.orderData} height="6rem"/>*/}
                {/*<LoadingView component={this.renderPrice} items={this.data.orderData} height="4rem"/>*/}
                {/*<LoadingView component={this.renderOrderTime} items={this.data.orderData} height="5rem"/>*/}
                {this.renderOrderStatus(items, this.data.logisticData)}
                {this.renderOrderList(items)}
                {this.renderPrice(items)}
                {this.renderOrderTime(items)}
            </div>
        )
    }
    renderAddrInfo = ({items})=> {
        return (
            <div className="info">
                <div className="icon addr"></div>
                <div className="text">
                    <p style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>收货人：{items.name}    </span>
                        <span>{items.mobile}</span>
                    </p>
                    <p>
                        收货地址：{items.addressAll}
                    </p>
                </div>
            </div>
        )
    }
    renderTopState = ({items})=> {
        const {params} = this.props;
        let orderState = items.orderState, stateOutput = "", remarkOutput = "", stateClass="status finished" ;
        let createTime = items.createTime;
        let countdown = 0;
        let now = 0;
        let deadline = 0;
        let infoOutput = <div></div>
        if(items.remark != "") {
            remarkOutput =  <div className="info">
                <div className="icon feedback"></div>
                <div className="text">
                    <p>
                        买家留言
                    </p>
                    <p>
                        {items.remark}
                    </p>
                </div>
            </div>
        }
        switch(orderState) {
            case 1:
                let createT = new Date(createTime).getTime();
                now = new Date().getTime(),
                    deadline = 86400000;
                countdown = createT + deadline - now;
                countdown = parseInt(countdown / (3600*1000) );
                stateOutput = <div><div>等待买家付款</div><div style={{fontSize:'.26rem'}}>剩{countdown}小时自动关闭</div></div>
                infoOutput = <div></div>
                stateClass="status unpay"
                break;
            case 2:
                stateOutput = <div><div>等待卖家发货</div></div>
                infoOutput = <div></div>
                stateClass="status payed"
                break;
            case 3:
                stateOutput = <div><div>等待卖家发货</div></div>
                infoOutput = <div></div>
                stateClass="status payed"
                break;
            case 4:
                let deliverT = new Date(items.deliverTime).getTime();
                now = new Date().getTime(),
                    deadline = 86400000*15;
                countdown = deliverT + deadline - now;
                let days = parseInt(countdown / (3600*1000*24) );
                let hours = parseInt(countdown / (3600*1000));
                let lefthours = hours - (days*24);
                stateOutput = <div><div>卖家已发货</div><div style={{fontSize:'.26rem'}}>还剩{days}天{lefthours}小时自动确认</div></div>
                stateClass="status delivering";
                break;
            case 5:
                break;
            case 6:
                stateOutput = <div><div>交易关闭</div><div style={{fontSize:'.26rem'}}>我不想买了</div></div>
                infoOutput = <div></div>
                break;
        }
        return (
            <div className="banner">{stateOutput}<div className={stateClass}></div></div>
        )
    }
    renderRemark = ({items})=> {
        if(items.remark!="") {
            return (
                <div className="info">
                    <div className="icon feedback"></div>
                    <div className="text">
                        <p>
                            买家留言
                        </p>
                        <p>
                            {items.remark}
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    onCancelorder = (item)=> {
        console.log(item);
        const alertInstance = alert('提示', '确认取消该订单吗？', [
            { text: '不取消了', onPress: () => console.log('cancel'), style: { fontWeight: 'bold', color:'rgb(140, 170, 180)' } },
            { text: '确认取消', onPress: () => {
                let member_id = item.memberId;
                let order_id = item.id;
                API.AppOrder_cancalorder({member_id, order_id}).then((response)=>{
                    if(response.code == 200) {
                        Toast.success(response.message, 1);
                    } else {
                        Toast.fail(response.message, 1);
                    }
                });
                //
            }, style: { color: '#000' } },
        ]);
    }
    onConfirmOrder = (item)=> {
        const alertInstance = alert('提示', '确认收到该商品吗？', [
            { text: '还没收到', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确认收到', onPress: () => {
                let orders_id = item.id;
                let order_state = 4;
                API. AppOrder_UpdateOrdersState({orders_id, order_state}).then((response)=>{
                    if(response.code == 200) {
                        Toast.success(response.message, 1);
                    } else {
                        Toast.fail(response.message, 1);
                    }
                });
            }, style: { fontWeight: 'bold' } },
        ]);
    }
    renderBottomBar = (item)=> {
        let btn = []
        if(item) {
            switch(item.orderState) {
                case 1:
                    btn.push(
                        <div style={{display: 'flex'}}>
                            <div className="logistics" onClick={()=> {this.onConfirmOrder(item)}}>取消订单</div>
                            <div className="comment">确认收货</div>
                        </div>
                    )
                    break;
                case 2:
                    btn.push(
                        <div style={{display: 'flex'}}>
                            <div className="logistics" >查看物流</div>
                            <div className="comment" onClick={()=> {this.onConfirmOrder(item)}}>确认收货</div>
                        </div>
                    )
                    break;
                case 3:
                    btn.push(
                        <div style={{display: 'flex'}}>
                            <div className="logistics" >查看物流</div>
                            <div className="comment" onClick={()=> {this.onCancelorder(item)}}>确认收货</div>
                        </div>
                    )
                    break;

                case 4:
                    btn.push(
                        <div style={{display: 'flex'}}>
                            <div className="logistics" >查看物流</div>
                            <div className="comment">评价</div>
                        </div>
                    )
                    break;
                case 6:
                    btn.push(
                        <div style={{display: 'flex'}}>
                            <div className="logistics" onClick={()=> {this.onCancelorder(item)}}>取消订单</div>
                        </div>
                    )
                    break;
            }
            return (
                <div className="bar">
                    {btn}
                </div>
            )
        }

    }
    render() {
        return (
            <div className='main'>
                <Title render="订单详情"/>
                <div className="content">
                    <div className="order">
                        <div className="order-status">
                            <LoadingView component={this.renderTopState} items={this.data.orderData} height="2rem"/>
                            <div className="infow">
                                <LoadingView component={this.renderLogisticInfo} items={this.data.logisticData} height="1rem"/>
                                <LoadingView component={this.renderAddrInfo} items={this.data.orderData} height="1.26"/>
                                <LoadingView component={this.renderRemark} items={this.data.orderData} height="1.26"/>

                            </div>
                        </div>
                        <LoadingView component={this.renderOrderList} items={this.data.orderData} height="6rem"/>
                        <LoadingView component={this.renderPrice} items={this.data.orderData} height="4rem"/>
                        <LoadingView component={this.renderOrderTime} items={this.data.orderData} height="5rem"/>

                    </div>
                </div>


                {this.renderBottomBar(this.data.orderData)}

            </div>
        );
    }
}

export default Order