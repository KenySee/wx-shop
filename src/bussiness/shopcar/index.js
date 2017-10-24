import React from 'react'
import {observer} from 'mobx-react'
import { observable,action} from 'mobx'
import {Checkbox,Badge,Stepper,Toast,Modal,Popup,Button} from 'antd-mobile'
import store from "svg/store.svg"
import gwc_icon_dg_kx from "svg/public/gwc_icon_dg_kx.svg"
import gwc_icon_dg_sx from "svg/public/gwc_icon_dg_sx.svg"
import spxq_icon_gwc from "svg/pro_detail/spxq_icon_gwc.svg"
import _ from "lodash"
import {API, LoadingView, ImageView, MoneyText, Title,Iconfont} from 'components'
import Dotdotdot from 'react-dotdotdot'
import './index.scss'
import mock from '../home/data'
function getRandomArrayElements(arr, count) {
    return _.take(_.shuffle(arr), count);
}
export const shopcarState = observable({
    cartInfoVO: {},    //购物车信息
    cartListVOs:[],//购物车列表
    selectVO:[],//商家选中状态
    isFirstLoad:true, //是否第一次加载
    couponList:[],//优惠券列表
    guessData:null,//猜你喜欢
    //更新猜你喜欢
    fetchGuessData:observable.ref(action.bound(function() {
        this.guessData = getRandomArrayElements(mock.guessData,4);
    })),
    //更新购物车
    fetchEnd: observable.ref(action.bound(function() {
        Toast.loading("加载中...", 10, ()=>{Toast.fail('网络超时!!!', 1);}, true)
        API.appMemberInfo_getMemberCart({userId:1769851}).then((response)=>{
            if(response&&response.code=='200'&&response.data.cartInfoVO){
                this.cartInfoVO = response.data.cartInfoVO;
                this.cartListVOs = response.data.cartInfoVO.cartListVOs;
                //更新各个商家优惠券信息
                _.forEach(this.cartListVOs,(item)=>{
                    this.fetchCouponList(item.seller.id);
                })
                console.log(this.couponList);
                this.isFirstLoad=false;
                Toast.hide();
            }else{
                Toast.fail('加载购物车失败!!!', 1);
            }
        })
    })),
    //更新优惠券信息
    fetchCouponList: observable.ref(action.bound(function(data) {
        API.AppSeller_seller_coupon({sellerId:data}).then((response)=>{
            if(response&&response.code=='200'){
                let coupon = _.find(this.couponList,(item)=>{
                    return item.sellerId==data;
                })
                if(coupon){
                    item.list = response.data.list;
                }else{
                    this.couponList.push({sellerId:data,list:response.data.list});
                }
            }
        })
    })),
    //领取优惠券
    receiveCoupon: observable.ref(action.bound(function(data) {
        Toast.loading("加载中...", 10, ()=>{Toast.fail('网络超时!!!', 1);}, true);
        API.AppProduct_reveivecoupon({member_id:1769851,couponId:data}).then((response)=>{
            if(response&&response.code=='200'){
                Toast.success('领取成功!!!', 1);
            }else if(response.code=='202'){
                Toast.fail('已领取，请勿重复领取!!!', 1);
            }else{
                Toast.fail('领取优惠券失败!!!', 1);
            }
        })
    })),
    //修改商品数量
    updateCount:observable.ref(action.bound(function(data) {
        Toast.loading("加载中...", 10, ()=>{Toast.fail('修改失败!!!', 1);}, true)
        API.AppOrder_updateCartById({cartId:data.id,count:data.count}).then((response)=>{
            if(response&&response.code=='200'){
                _.forEach(this.cartListVOs,(item)=>{
                    _.forEach(item.cartList,(_item)=>{
                        if(_item.id===data.id){
                            _item.count=data.count;
                        }
                    });
                });
                this.cartInfoVO.cartListVOs=this.cartListVOs;
                this.sumList(this.cartInfoVO);
                Toast.hide();
            }else{
                Toast.fail('修改商品数量失败!!!', 1);
            }
        });
    })),
    //删除商品
    deleteItem:observable.ref(action.bound(function(data) {
        Modal.alert('提示', '确定删除该商品吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () => new Promise((resolve) => {
                    Toast.loading("加载中...", 10, ()=>{Toast.fail('删除失败!!!', 1);}, true);
                    API.AppOrder_deleteCartById({id:data}).then((response)=>{
                        if(response&&response.code=='200'){
                            _.remove(this.cartListVOs,(item)=>{
                                _.remove(item.cartList,(_item)=>{

                                    if(_item.id===data){
                                        this.cartInfoVO.totalNumber=this.cartInfoVO.totalNumber-_item.count;
                                        return true;
                                    }else{
                                        return false;
                                    }
                                });
                                return item.cartList.length==0;
                            });
                            this.cartInfoVO.cartListVOs=this.cartListVOs;
                            this.sumList(this.cartInfoVO);
                            Toast.hide();
                        }else{
                            Toast.fail('删除失败!!!', 1);
                        }
                    });
                    resolve();
                }),
                style: { fontWeight: 'bold',color:'#ff3a32'},
            },
        ])
    })),
    //修改商品选中状态
    checkItem:observable.ref(action.bound(function(data) {
        let updateItems = [];
        let checked = false;
        let ids = '';
        _.forEach(data,(item)=>{
           let cart =  _.find(this.cartListVOs,(_item)=>{
                return _item.seller.id===item.sellerId;
            });
           if(cart){
               let p = _.find(cart.cartList,(_item)=>{
                   return _item.id ===item.id;
               });
               if(p){
                   updateItems.push(p);
                   checked = item.checked;
                   ids = ids+item.id+",";
               }
           }
        });
        //批量修改
        //选中状态修改
        Toast.loading("加载中...", 10, ()=>{Toast.fail('修改失败!!!', 1);}, true);
        API.AppOrder_cartCheckedmany({member_id:1769851,ids:ids,checked:checked}).then((response)=>{
            if(response&&response.code=='200') {
                _.forEach(updateItems, (item) => {
                    item.checked = checked;
                    this.cartInfoVO.cartListVOs = this.cartListVOs;
                    this.sumList(this.cartInfoVO);
                    Toast.hide();

                })
            }else{
                Toast.fail('修改失败!!!', 1);
            }
        });
    })),
    //重新计算选中总金额
    sumList:observable.ref(action.bound(function(data) {
        let checkedCartAmount = 0;
        let totalCheckedNumber = 0;
        _.forEach(data.cartListVOs,(item)=>{
            let sellerCheckedCartAmount = 0;
            _.forEach(item.cartList,(_item)=>{
                //判断商品是否选中
                if(_item.checked==1){
                    checkedCartAmount = _.add(checkedCartAmount ,_item.product.malMobilePrice*_item.count);
                    sellerCheckedCartAmount = _.add(sellerCheckedCartAmount,_item.product.malMobilePrice*_item.count);
                    totalCheckedNumber=totalCheckedNumber+1;
                }
            });
            item.sellerCheckedAmount = sellerCheckedCartAmount;
        })
        data.totalCheckedNumber=totalCheckedNumber;
        data.checkedCartAmount=checkedCartAmount;
    })),
})
@observer
class ShopCar extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isEdit:[],//是否是编辑状态
        }
    }

    componentDidMount() {
        if(shopcarState.isFirstLoad){
            shopcarState.fetchEnd();
        }
        //猜你喜欢
        shopcarState.fetchGuessData();
    }

    _clickCoupon=(sellerId)=>{
        let coupon = _.find(shopcarState.couponList,(item)=>{
            return item.sellerId == sellerId;
        });
        let couponList = [];
        if(coupon){
            couponList = coupon.list;
        }
        console.log(couponList);
        Popup.show(this.couponRender(couponList), { animationType: 'slide-up', maskClosable: false });
    }

    _checkItem=(id,sellerId,checked)=>{
        shopcarState.checkItem([{id:id,sellerId:sellerId,checked:checked?1:0}]);
    }

    _sellerCheckItem=(sellerId,cartList,checked)=>{
        let items = [];
        _.forEach(cartList,(item)=>{
            if(item.checked!=checked){
                items.push({id:item.id,sellerId:sellerId,checked:checked?1:0})
            }
        });
        if(items&&items.length>0){
            shopcarState.checkItem(items);
        }
    }

    _allCheckItem=(cartListVOs,checked)=>{
        let items = [];
        _.forEach(cartListVOs,(item)=>{
            _.forEach(item.cartList,(_item)=>{
                if(_item.checked!=checked){
                    items.push({id:_item.id,sellerId:item.seller.id,checked:checked?1:0})
                }
            });
        });
        if(items&&items.length>0){
            shopcarState.checkItem(items);
        }
    }

    couponRender=(couponList)=>{
        return (
            <div className="couponList">
                <div className="top">
                    <div className="title">店铺优惠券</div>
                    <div className="nextTitle">领取优惠券</div>
                </div>
                <div className="center">
                    {couponList&&couponList.length>0?couponList.map((item,index)=>{
                        return (
                            <div className="item" key={index}>
                                <div className="itemLeft">
                                    <div className="itemTop">
                                        {item.couponValue}<span className="textSmall">元</span>
                                    </div>
                                    <div className="itemCenter">
                                        <div>订单满{item.minAmount}可使用（不含邮费）</div>
                                    </div>
                                    <div className="itemBottom">
                                        有效期{item.useStartTimeStr}-{item.useEndTimeStr}
                                    </div>
                                </div>
                                <div className="itemRight">
                                    <Button onClick={()=>{
                                        shopcarState.receiveCoupon(item.id);
                                    }} type="ghost" inline size="small" style={{ marginRight: '0.08rem',color:'red', border: '1px solid #ff3a32'}}>领取</Button>
                                </div>
                        </div>
                        )
                    }):"无可用优惠券！"}

                </div>

                <div className="bottom" onClick={()=>{Popup.hide();}}>关闭</div>
            </div>
        );
    }

    cutFullRender=(actFull,sellerAmount,seller)=>{
        if(null==actFull) {
            return null
        }
        let xcMoney=0.00;
        const{firstFull,firstDiscount,secondFull,secondDiscount,thirdFull,thirdDiscount,startTime,endTime}=actFull;
        if(!(firstFull && sellerAmount>=firstFull)){  //如果价格大于一档
            xcMoney=firstFull-sellerAmount;
            return (<div className="shopItemBottom">
                <div className="left">
                    <div>再买{xcMoney}减去{firstDiscount}</div>
                </div>
                <div className="right">
                    <div>去凑单</div>
                    <div className="icon"><Iconfont type={"right"} size={"sm"} color={"#fa3232"}></Iconfont></div>
                </div>
            </div>);
        }else{
            //满减文字
            let cutFullText = '';
            if(startTime){
                let sTime = startTime.split(" ")[0];
                sTime = sTime.split("-");
                cutFullText = sTime[1]+"/"+sTime[2];
            }
            if(endTime){
                let sTime = endTime.split(" ")[0];
                sTime = sTime.split("-");
                cutFullText = cutFullText+"-"+sTime[1]+"/"+sTime[2];
            }
            if(firstFull){
                cutFullText = cutFullText + `满${firstFull}减去${firstDiscount},`;
            }
            if(secondFull){
                cutFullText = cutFullText + `满${secondFull}减去${secondDiscount},`;
            }
            if(thirdFull){
                cutFullText = cutFullText + `满${thirdFull}减去${thirdDiscount},`;
            }
            cutFullText = _.trimEnd(cutFullText,",");
            if(cutFullText){
                cutFullText = ""+cutFullText;
            }
            return (
                <div className="shopItemBottom">
                    <div className="left">
                        <Badge text="满减" style={{marginRight: "0.12rem", padding: '0 0.06rem',backgroundColor: '#fff',height:'0.36rem',width:'0.66rem',borderRadius: "0.05rem",color: '#ff3a32', border: '1px solid #ff3a32',}}/>
                        <div>{cutFullText}</div>
                    </div>
                </div>
            )
        }
    }

    editCar=(sellerId,state)=>{
        let sellerEdit = _.find(this.state.isEdit,(item)=>{return item.sellerId==sellerId})
        if(sellerEdit){
            sellerEdit.state=state;
        }else{
            this.state.isEdit.push({sellerId:sellerId,state:state});
        }
        this.setState({isEdit:this.state.isEdit});
    }

    getSellerEdit=(sellerId,isEdit)=>{
        let editState = false;
        let sellerEdit = _.find(isEdit,(item)=>{
            return item.sellerId==sellerId;
        });
        if(sellerEdit){
            editState = sellerEdit.state;
        }
        return editState;
    }

    topBarRender=(sellerId,isEdit)=>{
        let editState = this.getSellerEdit(sellerId,isEdit);
        if(!editState){
            return (<a onClick={()=>{this.editCar(sellerId,true)}}>编辑</a>)
        }else{
            return (<a onClick={()=>{this.editCar(sellerId,false)}}>完成</a>);
        }
    }

    itemRender=(cartList,sellerId,isEdit)=>{
        let editState = this.getSellerEdit(sellerId,isEdit);
        if(!editState){
            return cartList.map((p,pindex)=>{
                let margin_top = pindex>0?"0.05rem":"0rem";
                return (
                    <div className="shopItemCenter" key={pindex} style={{"margin-top":margin_top}}>
                        <div className="shopItemCheckBox">
                            {p.checked==1?<div onClick={()=>{this._checkItem(p.id,sellerId,false);}}><Iconfont type={gwc_icon_dg_sx} color={'#ff3a32'}/></div>:
                                <div  onClick={()=>{this._checkItem(p.id,sellerId,true);}}><Iconfont type={gwc_icon_dg_kx}/></div>}
                        </div>
                        <div className="imgDiv">
                            <img src={`${p.product.masterImg}?imageView/1/w/180/h/180`} alt=""/>
                        </div>
                        <div className="itemInfo">
                            <div className="top"><Dotdotdot clamp={2}>{p.product.name1}</Dotdotdot></div>
                            <div className="center"><Dotdotdot clamp={2}>{p.specInfo}</Dotdotdot></div>
                            <div className="bottom">
                                <div className="left">
                                    <div><MoneyText bigFont={"0.30rem"} smallFont={"0.26rem"} money={p.product.malMobilePrice}></MoneyText></div>
                                    {p.product.marketPrice>p.product.malMobilePrice? <div className="right">
                                        <MoneyText style={{"text-decoration":"line-through"}} bigFont={"0.24rem"} smallFont={"0.20rem"} money={p.product.marketPrice} color={"#878787"}></MoneyText>
                                    </div>:null}
                                </div>
                                <div className="numDiv">x{p.count}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            return cartList.map((p,pindex)=>{
                let margin_top = pindex>0?"0.05rem":"0rem";
                return (
                    <div className="shopItemCenter" key={pindex} style={{"margin-top":margin_top}}>
                        <div className="shopItemCheckBox">
                            {p.checked==1?<div onClick={()=>{this._checkItem(p.id,sellerId,false);}}><Iconfont type={gwc_icon_dg_sx} color={'#ff3a32'}/></div>:
                                <div  onClick={()=>{this._checkItem(p.id,sellerId,true);}}><Iconfont type={gwc_icon_dg_kx}/></div>}
                        </div>
                        <div className="imgDiv">
                            <img src={`${p.product.masterImg}?imageView/1/w/180/h/180`} alt=""/>
                        </div>
                        <div className="deleteItemInfo">
                            <div className="deleteItemLeft">
                                <div className="top">
                                    <Stepper
                                        style={{ width: '90%', minWidth: '2rem',"font-size":'0.26rem'}}
                                        showNumber
                                        max={p.productGoods.productStock}
                                        min={1}
                                        value={p.count}
                                        onChange={(val)=>{shopcarState.updateCount({id:p.id,count:val})}}
                                        useTouch={false}
                                    />
                                </div>
                                <div className="center"><Dotdotdot clamp={2}>{p.specInfo}</Dotdotdot></div>
                                <div className="bottom">
                                    <div className="left">
                                        <div><MoneyText bigFont={"0.30rem"} smallFont={"0.26rem"} money={p.product.malMobilePrice}></MoneyText></div>
                                        {p.product.marketPrice>p.product.malMobilePrice? <div className="right">
                                            <MoneyText style={{"text-decoration":"line-through"}} bigFont={"0.24rem"} smallFont={"0.20rem"} money={p.product.marketPrice} color={"#878787"}></MoneyText>
                                        </div>:null}
                                    </div>
                                </div>
                            </div>
                            <div className="deleteItemRight" onClick={()=>{shopcarState.deleteItem(p.id);}}>删除</div>
                        </div>
                    </div>
                )
            })
        }
    }

    shopItemRender=(items)=>{
        return (
            <div>
                {/*店铺循环开始*/}
                {items.map((item,index) => {
                    const checked = _.every(item.cartList,(car)=>{return car.checked});
                    let item_margin_top = index>0?"0.15rem":"0rem";
                    //判断是否满足满减
                    return(
                    <div className="shopItem" key={index} style={{"margin-top":item_margin_top}}>
                        <div className="shopItemTop">
                            <div className="left">
                                <div className="shopItemCheckBox">
                                    {checked?<div onClick={()=>{this._sellerCheckItem(item.seller.id,item.cartList,false);}}><Iconfont type={gwc_icon_dg_sx} color={'#ff3a32'}/></div>:
                                        <div onClick={()=>{this._sellerCheckItem(item.seller.id,item.cartList,true);}}><Iconfont type={gwc_icon_dg_kx}/></div>}
                                </div>
                                <div className="icon"><Iconfont type={store}></Iconfont></div>
                                <div className="textStyle" style={{"margin-left":"0.1rem"}}>{item.seller.sellerName}</div>
                                <div className="icon"><Iconfont colorful={true} type={"right"} size={"sm"} color={"#878787"}></Iconfont></div>
                            </div>
                            <div className="right">
                                <div className="textStyle" onClick={()=>{this._clickCoupon(item.seller.id)}}>领券</div>
                                <div className="textStyle">|</div>
                                <div className="textStyle">{this.topBarRender(item.seller.id,this.state.isEdit)}</div>
                            </div>
                        </div>
                        {this.itemRender(item.cartList,item.seller.id,this.state.isEdit)}
                        {this.cutFullRender(item.actFull,item.sellerCheckedAmount,item.seller)}
                    </div>)
                })}
                {/*店铺循环结束*/}
            </div>
        );
    }

    renderShopCar=(cartInfoVO,cartListVOs)=>{
        let checked = false;
        if(cartListVOs&&cartListVOs.length>0){
            checked = _.every(cartListVOs,(item)=>{return _.every(item.cartList,(car)=>{return car.checked})});
        }
        return (
            <div className="shopInfo">
                <div className="shopCenter">
                    {this.shopItemRender(cartListVOs)}
                    <div style={{width:'100%',height:"0.3rem"}}></div>
                </div>
                <div className="shopBottomBar">
                    <div className="shopBottomBarItemLeft">
                        <div>
                            {checked?<div onClick={()=>{this._allCheckItem(cartListVOs,false);}}><Iconfont type={gwc_icon_dg_sx} color={'#ff3a32'}/></div>:
                                <div onClick={()=>{this._allCheckItem(cartListVOs,true);}}><Iconfont type={gwc_icon_dg_kx}/></div>}
                        </div>
                        <div>全选</div>
                    </div>
                    <div className="shopBottomBarItemCenter">
                        <span style={{"font-size": "0.30rem"}}>合计：</span>
                        <MoneyText bigFont={"0.30rem"} smallFont={"0.26rem"} money={cartInfoVO.checkedCartAmount}></MoneyText>
                    </div>
                    <div className="shopBottomBarItemRight" onClick={()=>{this.submit(cartInfoVO.totalCheckedNumber)}}>
                        <div>结算({cartInfoVO?cartInfoVO.totalCheckedNumber:''})</div>
                    </div>
                </div>
            </div>
        )
    }

    submit=(count)=>{
        if(count>0) {
            const {router} = this.props;
            router.push({pathname: `/shopOrder/`})
        }else{
            Toast.fail('无选中商品!!!', 1);
        }
    }

    //未登录界面
    loginRender=()=>{
        return (
            <div className="login">
                <div className="left"><div><Button type="ghost" inline size="small" style={{ marginRight: '0.08rem' ,color:'#000', border: '1px solid #ff3a32'}}>登录</Button></div></div><div className="right">登录后同步购物车</div>
            </div>
        );
    }

    renderGuessLike = ({items}) => {
        return (
            <div className="guessLike">
                {
                    items.map((item,index)=>{
                        return (
                            <div className="item" key={"guess_"+index}>
                                <img srcSet={item.masterImg.srcSet} src={item.masterImg.src}/>
                                <div className="desc">
                                    <div className="name">
                                        <span className="red">精选</span>
                                        <span className="text">{item.name1}</span>
                                    </div>
                                    <MoneyText money={item.mallPcPrice} bigFont="0.32rem" smallFont="0.24rem"  style={{marginTop: '0.10rem',marginBottom: '0.10rem'}}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    _gotoIndex=()=>{
        const {router} = this.props;
        router.push({pathname: `/main/home/`})
    }

    //空购物车界面
    emptyRender=()=>{
        return(
            <div className="emptyShopCar">
                <div className="topItem">
                    <div className="leftItem"><div className="left"><Iconfont type={spxq_icon_gwc} color={"#959595"} size={"lg"}></Iconfont></div><div className="right">购物车是空的</div></div>
                    <div><Button className="btn" onClick={()=>{this._gotoIndex();}}>去首页逛逛吧~</Button></div>
                </div>
                <div className="bottomItem">
                    <div className="separator">
                        <span className="text">猜你喜欢</span>
                    </div>
                    <LoadingView component={this.renderGuessLike} items={shopcarState.guessData} height="2rem"/>
                </div>
            </div>
        );
    }

    checkRender=(cartInfoVO,cartListVOs)=>{
        //判断用户是否登录
        // if(userid){
            /*判断商品个数是否为空*/
            if(cartInfoVO&&cartInfoVO.totalNumber>0){
                return this.renderShopCar(cartInfoVO,cartListVOs);
            }else{
                return this.emptyRender();
            }
        // }else{
        //     return this.loginRender();
        // }
    }

    render() {
        return (
            <div className="shopCarRootDiv">
                <Title render="购物车"/>
                {shopcarState.isFirstLoad?null:this.checkRender(shopcarState.cartInfoVO,shopcarState.cartListVOs)}
            </div>
        )
    }
}

export default ShopCar