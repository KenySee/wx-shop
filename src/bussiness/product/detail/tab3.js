import React from 'react';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Dotdotdot from 'react-dotdotdot'
import {API,LoadingView,ImageView,MoneyText,Iconfont} from 'components'
const mockData = {
    comment:{
        allCommentList:[
            {nickName:'张三',grade:4,createTime:'2017-04-22 08:00:00',
                list:[{url:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'}
                    ,{url:'https://image.zallhy.com//96aee1b05bf84a5693595a6f3a59a59a?imageView/1/w/375/h/375'}],
                member:{headimgurl:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'},content:'德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下'},
            {nickName:'李四',grade:3,createTime:'2017-06-23 08:00:00',
                member:{headimgurl:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'},content:'德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下'},
            {nickName:'王五',grade:5,createTime:'2017-01-24 08:00:00',
                list:[{url:'https://image.zallhy.com//cade6523887545429b2df949a9191a36?imageView/1/w/375/h/375'}
                    ,{url:'https://image.zallhy.com//d18a547f0254478c83414b14d00760c7?imageView/1/w/375/h/375'}
                    ,{url:'https://image.zallhy.com//047be26e301341eaaf311442f2f57730?imageView/1/w/375/h/375'}],
                member:{headimgurl:'https://image.zallhy.com//8ab8b2a222b546e583c12da94f5bd045?imageView/1/w/375/h/375'},content:'德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下德国电信称，此次预购活动不接受来自互联网的预约，只允许消费者到实体店内下'}
        ]
    }
}
@observer
class Tab3 extends React.Component {
    data = observable({
        comment:null,
        currentBarId:0,
        tabBar:[{id:0,text:'全部评价',count:0},{id:1,text:'好评',count:0},{id:2,text:'中评',count:0},{id:3,text:'差评',count:0},{id:-1,text:'有图',count:0}]
    })
    componentDidMount() {
        const {params} = this.props;
        API.AppProduct_productComment({...params,pageNum: 1,pageSize: 50}).then((response)=>{
            this.data.comment = mockData.comment;//response.data;
        });
    }
    renderProComment = ({data}) => {
        if(data.allCommentList.length == 0){
            return null;
        }
        return(
            <div className="pro_comment">
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
            </div>
        )
    }
    renderCommentTab = ({items,currentId}) => {
        return (
            <div className="commentTab">
                {
                    items.map((item,index)=>{
                        var i = currentId==item.id;
                        return (
                            <div className={"tabItem "+(i && 'active')}>{i && '✓'}<span className="text">{item.text}</span> {item.count}</div>
                        )
                    })
                }
            </div>
        )
    }
    render() {
        return (
            <div className="tab3">
                <LoadingView component={this.renderCommentTab} items={this.data.tabBar} currentId={this.data.currentBarId} height="2rem"/>
                <div className="contentScroll">
                    <LoadingView component={this.renderProComment} data={this.data.comment} height="2rem"/>
                </div>
            </div>
        )
    }
}
export default Tab3