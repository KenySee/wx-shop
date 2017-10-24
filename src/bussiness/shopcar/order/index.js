import React from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import store from "svg/store.svg"
import ddxq_icon_shdz from "svg/order/ddxq_icon_shdz.svg"
import grzx_icon_Path from "svg/public/grzx_icon_Path.svg"
import gwc_icon_dg_kx from "svg/public/gwc_icon_dg_kx.svg"
import gwc_icon_dg_sx from "svg/public/gwc_icon_dg_sx.svg"
import {API,LoadingView,ImageView,MoneyText,Title,Iconfont,formatMoney} from 'components'
import Dotdotdot from 'react-dotdotdot'
import { Modal, Button, WingBlank, WhiteSpace, Toast,InputItem,Popup } from 'antd-mobile';
import _ from 'lodash'
import './index.scss'
import {shopcarState} from '../'
const alert = Modal.alert;
@observer
class ShopOrder extends React.Component {
    data = observable({
        address: {memberName:'',id:null,mobile:'',addAll:'',addressInfo:''},
        freight:[],
        orders:[],
        amount: 0,
        carlist: [],
        fetchAddressMoney:observable.ref(action.bound(function(data) {
            //拿成员所有state 对像
            let freightArray = [];
            let sellerIds = '';
            let nums = '';
            if(this.carlist!=null&&data.id) {
                let num = [];
                const carlist = this.carlist;
                const list = _.filter(carlist, (car) => {
                    car.cartList = _.filter(car.cartList, (pro) => {
                        if (pro.checked) {
                            let sellerFreight = _.find(freightArray,(item)=>{
                                return item.sellerId == pro.sellerId;
                            })
                            if(sellerFreight){
                                sellerFreight.num = sellerFreight.num+pro.count;
                            }else{
                                freightArray.push({sellerId:pro.sellerId,num:pro.count});
                            }
                        }
                        return pro.checked;
                    });
                });

                if(freightArray!=null && freightArray.length>0) {
                    try {
                        _.forEach(freightArray,(item)=>{
                            sellerIds = sellerIds+item.sellerId+",";
                            nums = nums + item.num + ",";
                        })

                        API.AppOrder_calculateTransFee({ sellerId: _.trimEnd(sellerIds,','),num: _.trimEnd(nums,','), cityId: data.id}).then((response)=>{
                            if (response.code == 200) {
                                this.freight = response.data.price;
                            }
                        });
                    }
                    catch (error){
                        console.log(error);
                    }
                }
            }
        })),

        fethCarList:observable.ref(action.bound(function(carlist) {
            let amount = 0.0, sellerlist = [];

            const list = _.filter(carlist, (car) => {
                car.cartList = _.filter(car.cartList, (pro) => {
                    if (pro.checked) {
                        amount += pro.count * pro.productGoods.mallMobilePrice;
                    }
                    return pro.checked;
                });
                if (car.cartList.length) {
                    sellerlist.push(car.seller);
                }
                return car.cartList.length;
            });
            this.carlist = list;
            this.amount=amount;
            this.fetchOrders();
            this.fetchDefalutData();
        })),

        feth:observable.ref(action.bound(function() {
            let carlist = shopcarState.cartListVOs;
            if(!(carlist&&carlist.length>0)){
                API.appMemberInfo_getMemberCart({userId:1769851}).then((response)=>{
                    if(response&&response.code=='200'&&response.data.cartInfoVO){
                        carlist = response.data.cartInfoVO.cartListVOs;
                        this.fethCarList(carlist);
                    }else{
                        Toast.fail('加载购物车失败!!!', 1);
                    }
                });
            }else{
                this.fethCarList(carlist);
            }

        })),

        fetchOrders:observable.ref(action.bound(function() {
            API.AppOrder_order_CommitOrder({member_id:1769851}).then((response)=>{
                if(response){
                    this.orders = response.data.orders;
                }else{
                    Toast.fail('加载订单信息失败!!!', 1);
                }
            })
        })),


        fetchDefalutData:observable.ref(action.bound(function() {
            API.appMemberInfo_DefultAddress({member_id:1769851}).then((response)=>{
                if(response&&response.code=='200'&&response.data.address){
                   this.address = response.data.address;
                   this.fetchAddressMoney(response.data.address);
                }else{
                    Toast.fail('加载默认收货地址失败!!!', 1);
                }
            })
        })),


    })
    componentDidMount() {
        this.data.feth();
    }
    componentDidUpdate() {
        //console.log("updated");
    }

    state={
        couponAlllist:[],
        couponlist:null,
        sellerCoupon:[],
        isSubmit:false,
        sellerMsg:[],
    }

    onPressSubmit = async () => {
        //判断是否提交状态中
        if(this.state.isSubmit){
            Toast.info('订单提交中，请勿重复操作!',1000);
        }else{
            // const isInstalled = await WeChat.isWXAppInstalled();
            // if(!isInstalled){
            // ToastLong('没有安装微信软件，请您安装微信之后再试');
            // return;
            // }
            this.setState({isSubmit:true});
            Toast.info('提交订单中...',10000);
            let coupon = [];
            const {address} = this.data;
            //选中优惠券信息
            _.forEach(this.state.sellerCoupon, (item) => {
                coupon.push({"sellerId":item.sellerId,"couponSnStr":item.id});
            });

            let params = {
                "member_id": 1769851,
                "MemberName": address.memberName,
                "AddresId": address.id,
                "integral": parseInt(0),
                "coupon":coupon,
                "info":this.state.sellerMsg,
            };
            console.log(params)
            try {
                if (params.AddresId) {
                    const response = await API.AppOrder_order_CommitOrder(params).then((response)=>{
                      return response;
                    });
                    console.log(response)
                    if (response.code == 200) {
                        // await this.onWeChatPay(response.data.relationOrderId);
                        //刷新个人中心的方法
                        // this.props.dispatch(createAction('setting/fetch')({userId:userId}));
                        //刷新购物车个数
                        // this.props.dispatch(createAction('shopcar/fetch')({userId}));
                        Toast.hide();
                    }
                    else {
                        Toast.hide();
                        Toast.info(response.message,1000);
                    }
                } else {
                    Toast.hide();
                    Toast.info("请添加收货地址",1000);
                }
            }
            catch (error) {
                console.log(error)
                Toast.hide();
            }

            this.setState({isSubmit:false});
        }
    }

    //根据店铺id获取店铺商品金额
    getSellerAmount=(car)=>{
        let amount = 0;
        _.forEach(car.cartList,(item)=>{
            amount = amount+item.productGoods.mallMobilePrice*item.count;
        });
        return amount;
    }

    //获得选中店铺商品数量
    getSellerCheckCount=(car)=>{
        let checkCount = 0;
        _.forEach(car.cartList,(item)=>{
            checkCount = checkCount + item.count;
        });
        return checkCount;
    }

    //根据店铺id获取店铺优惠券信息
    getSellerCoupon=(seller_id,sellerCoupon)=>{
        let coupon = null;
        if(sellerCoupon&&sellerCoupon.length>0){
            coupon = _.find(sellerCoupon,(o)=>{return o.sellerId==seller_id});
        }
        return coupon;
    }

    //获得总金额
    getAllAmount = (carlist)=>{
        let amount = 0;
        carlist.map((car) => {
            //计算商家订单金额值
            let tempAmount = this.getSellerAmount(car);
            //计算商家优惠金额
            let discountAmount = this.getSellerDiscountAmount(car.seller.id,this.data.orders);
            //商家优惠券信息
            let sellerCoupon = this.getSellerCoupon(car.seller.id,this.state.sellerCoupon);
            let coupon = sellerCoupon?sellerCoupon.couponValue:0;
            //商家运费信息
            let freight = _.find(this.data.freight,(o)=>{return o.sellerid==car.seller.id});
            if(freight){
                freight = freight.Currymony;
            }else{
                freight = 0;
            }
            //计算商品小计
            let amountReal = tempAmount - 0 - discountAmount+freight-coupon;
            amount = amount+amountReal;
        });
        return amount;
    }

    //根据店铺id获取店铺优惠金额
    getSellerDiscountAmount=(seller_id,orders)=>{
        let discountAmount = 0;
        if(orders&&orders.length>0){
            let order = _.find(orders,(o)=>{return o.cartListVO.seller.id==seller_id});
            if(order){
                discountAmount = order.cartListVO.sellerCheckedDiscounted;
            }
        }
        return discountAmount;
    }


    //根据店铺id获取店铺运费
    getSellerFreight=(seller_id,yunfei)=>{
        let freight = _.find(yunfei,(o)=>{return o.sellerid==seller_id});
        if(freight){
            return freight.Currymony;
        }
        return 0;
    }

    addressRender=(address)=>{
        if((address&&address.id!=null)){
            return (<div className="userInfo">
                <div className="user">
                    <div>收货人：{address.memberName}</div>
                    <div>{address.mobile}</div>
                </div>
                <div className="address">
                    <div className="addressText"><div className="addressIcon"><Iconfont type={ddxq_icon_shdz} /></div><div className="text">收货地址：{address.addAll}{address.addressInfo}</div></div>
                    <div className="right"><Iconfont type={grzx_icon_Path} size={"xxs"}/></div>
                </div>
            </div>)
        }else{
            return (<div className="userInfo">
                <div className="address">
                    <div className="addressText"><div className="addressIcon"><Iconfont type={ddxq_icon_shdz} /></div><div className="text">添加收货地址</div></div>
                    <div className="right"><Iconfont type={grzx_icon_Path} size={"xxs"}/></div>
                </div>
            </div>)

        }
    }

    addSellerMsg = (text,sellerId)=>{
        let msg = _.find(this.state.sellerMsg,(o)=>{
            return o.sellerId==sellerId;
        });
        if(msg){
            msg.message = text;
        }else{
            this.state.sellerMsg.push({"sellerId":sellerId,"message":text});
        }
    }

    itemRender = (pro,index)=>{
        return (
            <div className="sellerItemContent" key={index}>
                <div className="sellerItem">
                    <div className="imgDiv">
                        <img src={`${pro.product.masterImg}?imageView/1/w/180/h/180`} alt=""/>
                    </div>
                    <div className="itemInfo">
                        <div className="top"><Dotdotdot clamp={2}>{pro.product.name1}</Dotdotdot></div>
                        <div className="center"><Dotdotdot clamp={2}>{pro.specInfo}</Dotdotdot></div>
                        <div className="bottom">
                            <div className="left">
                                <div><MoneyText bigFont={"0.30rem"} smallFont={"0.26rem"} money={pro.productGoods.mallMobilePrice}></MoneyText></div>
                            </div>
                            <div className="numDiv">x{pro.count}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    shopCartRender = (car,index) => {
        let tickets = this.getSellerTicket(car.seller.id,this.data.orders,car.seller.sellerName);
        //计算商家订单金额值
        let amount = this.getSellerAmount(car);
        //计算商家优惠金额
        let discountAmount = this.getSellerDiscountAmount(car.seller.id,this.data.orders);
        //商家优惠券信息
        let sellerCoupon = this.getSellerCoupon(car.seller.id,this.state.sellerCoupon);
        let coupon = sellerCoupon?sellerCoupon.couponValue:0;
        //商家运费信息
        let freight = this.getSellerFreight(car.seller.id,this.data.freight);
        //计算商品小计
        let amountReal = amount - 0 - discountAmount+freight-coupon;
        //计算商品数量
        let checkCount = this.getSellerCheckCount(car);
        return (
            <div className="sellerInfo" key={index}>
                <div className="sellerTitle">
                    <div className="titleIcon"><Iconfont type={store}/></div>
                    <div className="title">{car.seller.sellerName}</div>
                </div>
                {car.cartList.map((pro,index) => {
                    return this.itemRender(pro,index);
                })}
                <div className="boxContent" onClick={()=>{this.onPreesCoupon(car.seller.id,car.seller.sellerName)}}>
                    <div className="textContent">
                        <div>优惠券</div>
                        <div className="rightIcon"><div>{coupon?`${coupon}元优惠券`:'选择优惠券'}</div><div className="icon"><Iconfont type={grzx_icon_Path} size={"xxs"}/></div></div>
                    </div>
                </div>
                <div className="boxContent">
                    <div className="textContent">
                        <div>订单满减</div>
                        <div className="rightIcon"><div style={{color:'#ff3a32'}}>¥{formatMoney(discountAmount)}</div></div>
                    </div>
                </div>
                <div className="boxContent">
                    <div className="textContent">
                        <div>配送方式</div>
                        <div className="rightIcon">快递¥{freight}元</div>
                    </div>
                </div>
                <div className="boxContent">
                    <div className="textContent">
                        <div>买家留言：</div>
                        <div className="rightInput"><InputItem style={{border:"none",
                            "width":"100%","min-height":"0.8rem","height":"0.8rem"}} onChange={(val)=>{this.addSellerMsg(val,car.seller.id)}} placeholder="选填  对本次交易的说明"/></div>
                    </div>
                </div>
                <div className="sellerCountText">
                    <div>共{checkCount}件商品</div><div className="rightText">小计：<MoneyText bigFont={"0.30rem"} smallFont={"0.26rem"} money={amountReal}></MoneyText></div>
                </div>
            </div>);
    }


    //根据店铺id获取店铺优惠券列表
    getSellerTicket=(seller_id,orders,seller_name)=>{
        let tikets = null;
        if(orders&&orders.length>0){
            let order = _.find(orders,(o)=>{return o.cartListVO.seller.id==seller_id});
            if(order){
                let list = order.couponUser;
                tikets={
                    seller: {id:seller_id,sellerName:seller_name},
                    list: list
                };
            }
        }
        let couponAlllist = this.state.couponAlllist;
        if(couponAlllist&&couponAlllist.length>0&&tikets) {
            _.remove(couponAlllist, (item) => {
                return item.seller.id == seller_id
            });
            couponAlllist.push(tikets);

        }else{
            if(tikets){
                couponAlllist.push(tikets);
            }
        }
        this.state.couponAlllist = couponAlllist;
        return tikets;
    }

    onPreesCoupon = (sellerId,sellerName) => {
        //从服务器获得
        if (this.state.couponAlllist && this.state.couponAlllist.length > 0) {
            let temp = _.find(this.state.couponAlllist,(item)=>{return item.seller.id==sellerId});
            if(temp){
                this.setState({couponlist:temp});
            }
            Popup.show(<Coupon coupon={temp} onPressCouponItem={this.onPressCouponItem}></Coupon>, { animationType: 'slide-up' });
        }else{
            Toast.info("无可用优惠券！");
        }
    }

    onPressCouponItem = (item,list) => {
        let sellerCoupon = this.state.sellerCoupon;
        let couponAlllist = _.find(this.state.couponAlllist,(o)=>{
            return o.seller.id == item.sellerId;
        });
        //选中
        if(!item.isuse){
            //清除其他选中状态
            list.forEach((o)=>{
                if(o.id!=item.id&&o.isuse){
                    o.isuse = false;
                    //清除商家选中优惠券
                    _.remove(sellerCoupon,(temp)=>{return temp.id==o.id});
                }
            });
            sellerCoupon.push(item);
        }
        //取消选中
        else{
            _.remove(sellerCoupon,(temp)=>{return temp.id==item.id});
        }
        item.isuse = !item.isuse;
        couponAlllist.list = list;
        this.setState({sellerCoupon:sellerCoupon,couponlist:JSON.parse(JSON.stringify(couponAlllist))});
        return couponAlllist;
    }


    render() {
        return (
            <div className='content'>
                <Title render="确认订单"/>
                {this.addressRender(this.data.address)}
                {this.data.carlist.map((car,index) => {
                    return this.shopCartRender(car,index)
                })}
                <div className="textContent" style={{"background-color":"#ffffff","margin-top":"0.2rem","border-bottom":0, "padding-left":"0.2rem", "padding-right": "0.2rem"}}>
                    <div>支付方式</div>
                    <div className="rightIcon">
                        <div>微信支付</div>
                        {/*<div className="icon"><Iconfont type={grzx_icon_Path} size={"xxs"}/></div>*/}
                    </div>
                </div>
                <div className="bottomBar">
                    <div className="bottomText">合计：<MoneyText bigFont={"0.34rem"} smallFont={"0.26rem"} money={this.getAllAmount(this.data.carlist)}></MoneyText></div>
                    <div className="bottomButton" onClick={this.onPressSubmit} style={{backgroundColor:this.state.isSubmit?'#878787':'#fa3232'}}>提交订单</div>
                </div>
            </div>
        );
    }
}

class Coupon extends React.Component{

    onPressCouponItem=(item,list)=>{
        let coupon = this.props.onPressCouponItem(item,list);
        this.setState({coupon:coupon});
    }

    state={
        coupon:this.props.coupon,
    }
    render(){
        return (
            <div className="couponList">
                <div className="couponTop">
                    <div className="couponTitle">店铺优惠券</div>
                    <div className="couponNextTitle">领取优惠券</div>
                </div>
                <div className="couponCenter">
                    {this.props.coupon&&this.props.coupon.list.length>0?this.props.coupon.list.map((item,index)=>{
                        return (
                            <div className="couponItem" key={index} onClick={()=>{this.onPressCouponItem(item,this.props.coupon.list)}}>
                                <div className="couponItemLeft">
                                    <div className="couponItemTop">
                                        {item.couponValue}<span className="textSmall">元</span>
                                    </div>
                                    <div className="couponItemCenter">
                                        <div>订单满{item.minAmount}可使用（不含邮费） </div>
                                    </div>
                                    <div className="couponItemBottom">
                                        有效期{item.useStartTimeStr}-{item.useEndTimeStr}
                                    </div>
                                </div>
                                <div className="couponItemRight">
                                    {item.isuse ? <Iconfont type={gwc_icon_dg_sx} color={'#ff3a32'}/> :
                                        <Iconfont type={gwc_icon_dg_kx}/>}
                                </div>
                            </div>
                        )
                    }):"无可用优惠券！"}

                </div>

                <div className="bottom" onClick={()=>{Popup.hide();}}>关闭</div>
            </div>
        );
    }
}

export default ShopOrder