import React from 'react';
import { observable,action} from 'mobx'
import { observer } from 'mobx-react'
import { Carousel } from 'antd-mobile';
import Dotdotdot from 'react-dotdotdot'
import {API,LoadingView,ImageView,MoneyText,Iconfont} from 'components'
const mockData = {
    ticketList: [{couponName:'满1000减100'},{couponName:'满500减50'},{couponName:'满100减10'}],
    specList:[
        {text:'颜色',values:[{id:1,name:'冰种'},{id:2,name:'飘花'},{id:3,name:'老坑'},{id:4,name:'糯种'},{id:5,name:'测试'}]},
        {text:'尺寸',values:[{id:1,name:'大号'},{id:2,name:'中号'},{id:3,name:'上号'}]}
    ],
    comment:{
        allCommentList:[
            {nickName:'张三',grade:4,
                list:[{url:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'}
                ,{url:'https://image.zallhy.com//96aee1b05bf84a5693595a6f3a59a59a?imageView/1/w/375/h/375'}],
                member:{headimgurl:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'},content:'德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下'},
            {nickName:'李四',grade:3,
                member:{headimgurl:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'},content:'德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下'},
            {nickName:'王五',grade:5,
                list:[{url:'https://image.zallhy.com//cade6523887545429b2df949a9191a36?imageView/1/w/375/h/375'}
                ,{url:'https://image.zallhy.com//d18a547f0254478c83414b14d00760c7?imageView/1/w/375/h/375'}
                ,{url:'https://image.zallhy.com//047be26e301341eaaf311442f2f57730?imageView/1/w/375/h/375'}],
                member:{headimgurl:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'},content:'德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下'}
        ]
    }
}
@observer
class Tab1 extends React.Component {
    data = observable({
        goods: {},     //物品信息
        banner: null,   //商品主图
        ticketList:null, //优惠券
        product: null, //商品信息
        seller: null, //卖家信息
        info:null,//商品详情
        comment:null,//商品评论
        isCollect: false, //是否关注
        isMoreGoods:false,//默认不展开属性接口
        fetchEnd: observable.ref(action.bound(function(data){
            this.banner = data.productLeadPicList.map((item) => {return {uri: item}});
            this.product = data.product;
            this.seller = data.seller;
            this.goods = data.goods;
            this.isMoreGoods = data.isMoreGoods;
            this.isCollect = data.isCollect;
        }))
    })
    componentDidMount() {
        const {params} = this.props;
        API.AppProduct_getProductDetail(params).then((response)=>{
            this.data.fetchEnd(response.data);
            API.AppProduct_getproductactinfo({...params,sellerId:response.data.seller.id}).then((res)=>{
                this.data.ticketList = mockData.ticketList;//res.data.Coupon;
            })
        })
        API.AppProduct_productComment({...params,pageNum: 1,pageSize: 50}).then((response)=>{
            this.data.comment = mockData.comment;//response.data;
        });
    }
    renderProCarousel = ({items}) => (
        <Carousel
            className="pro_carousel"
            autoplay={false}
            infinite
            selectedIndex={0}
            swipeSpeed={35}>
            {items.map((item,index) => (
                <a key={'carouse'+index} href='#'>
                    <img
                        src={item.uri+'?imageView2/0/h/320/format/jpg'}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                        }}
                    />
                </a>
            ))}
        </Carousel>
    )
    renderProInfo = ({data}) => (
        <div className="pro_info">
            <Dotdotdot clamp={2} className="text">{data.sellerId==1 && <span className="red">自营</span>}{data.name1}{data.name1}{data.name1}{data.name1}{data.name1}{data.name1}{data.name1}{data.name1}</Dotdotdot>
            <MoneyText money={data.malMobilePrice} bigFont="0.46rem" smallFont="0.34rem"/>
            <div className="other">
                <div className="markerPrice">
                    市场价：<MoneyText money={data.marketPrice} bigFont="0.30rem" smallFont="0.24rem" color="#878787" style={{textDecorationLine: 'line-through'}}/>
                </div>
                <div className="freight_stock">
                    <div className="freight">
                        运费：<MoneyText money={data.freight} emptyText="包邮" bigFont="0.30rem" smallFont="0.24rem" color="#878787" style={{}}/>
                    </div>
                    <div className="stock">
                        库存：{data.productStock}件
                    </div>
                </div>
            </div>
        </div>
    )
    renderProTicket = ({items}) => (
        <div className="pro_ticket">
            <div className="label">领券：</div>
            <div className="list">
                {items.map((item,index)=>{
                    return(
                        <div className="item">
                            <ImageView fixed={true} height="0.42rem" width="0.09rem" src={require('./img/lq_jc_left@3x.png')}/>
                            <div className="text">{item.couponName}</div>
                            <ImageView fixed={true} height="0.42rem" width="0.09rem" src={require('./img/lq_jc_right@3x.png')}/>
                        </div>
                    )
                })}
            </div>
            <div className="blank"><div className="dot">...</div></div>
        </div>
    )
    renderProSpec = ({data}) => (
        <div className="pro_spec">
            <div className="label">选择：</div>
            <div className="value">颜色 分类</div>
            <div className="blank"><div className="dot">...</div></div>
        </div>
    )
    renderProComment = ({data}) => {
        if(data.allCommentList.length == 0){
            return null;
        }
        return(
            <div className="pro_comment">
                <div className="title_praise">
                    <div className="title">评价 (2)</div>
                    <div className="praise">
                        好评度
                        <span className="red">100%</span>
                        <Iconfont className="icon" type={require('svg/setting/grzx_icon_Path.svg')} />
                    </div>
                </div>
                {data.allCommentList.map((item,index)=>{
                    return (
                        <div className="comment">
                            <div className="nickname_star">
                                <div className="nickname">
                                    <img src={item.member.headimgurl}/>
                                    <span>{item.nickName}</span>
                                </div>
                                <div className="starlist">
                                    {
                                        _.range(5).map((i)=>{
                                            return (
                                                <Iconfont key={i} className="star" type={require('svg/pro_detail/spxq_icon_gz_kx.svg')} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Dotdotdot clamp={3} className="content">{item.content}</Dotdotdot>
                            {
                                item.list && item.list.length>0 &&
                                <div className="imglist">
                                    {item.list.map((li,index)=>{
                                        return (
                                            <img src={li.url}/>
                                        )
                                    })}
                                </div>
                            }
                            </div>
                        )
                    })}
                    <div className="allComment">查看全部评论</div>
            </div>
        )
    }
    renderProSeller = ({data}) => {
        return (
            <div className="pro_seller">
                <div className="seller">
                    <img src={data.sellerLogo}/>
                    <div className="title">
                        <div className="name">{data.sellerName}</div>
                        <div className="starlist">
                            {
                                _.range(5).map((i)=>{
                                    return (
                                        <Iconfont key={i} className="star" type={require('svg/pro_detail/spxq_icon_gz_kx.svg')} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="score">
                    <div className="product">
                        <div className="num">{data.productNumber}</div>
                        <div className="text">全部商品</div>
                    </div>
                    <div className="collect">
                        <div className="num">{data.collectionNumber}</div>
                        <div className="text">关注人数</div>
                    </div>
                    <div className="grade">
                        <div className="wrap">
                            <div>商品描述：{data.scoreDescription}</div>
                            <div>卖家服务：{data.scoreService}</div>
                            <div>物流服务：{data.scoreDeliverGoods}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        return (
            <div className="tab1">
                <LoadingView component={this.renderProCarousel} items={this.data.banner} height="4rem"/>
                <LoadingView component={this.renderProInfo} data={this.data.product} height="2rem"/>
                <LoadingView component={this.renderProTicket} items={this.data.ticketList} height="2rem"/>
                <LoadingView component={this.renderProSpec} data={this.data.product} height="2rem"/>
                <LoadingView component={this.renderProComment} data={this.data.comment} height="2rem"/>
                <LoadingView component={this.renderProSeller} data={this.data.seller} height="2rem"/>
            </div>
        )
    }
}
export default Tab1