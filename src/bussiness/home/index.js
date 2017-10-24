import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Carousel } from 'antd-mobile';
c
import {API,LoadingView,ImageView,MoneyText,Title} from 'components'
import mock from './data'
function getRandomArrayElements(arr, count) {
    return _.take(_.shuffle(arr), count);
}
@observer
class Home extends React.Component {
    data = observable({
        carouselData:null, //轮播
        cateData: null,    //分类
        todayData:null,    //今日
        loftData: null,    //楼层
        hotTopic: null,    //热门
        disCover: null,    //发现01
        disGoods: null,    //发现02
        guessData: null,    //猜你喜欢
    })
    componentDidMount() {
        API.appIndex_index_banner().then((response)=>{
            this.data.carouselData = response.data.list;
        });
        API.appIndex_recommend_cate().then((response)=>{
            response.data.list.push({
                "id": -1,
                "name": "更多",
                "sort": 99,
                "catepic": "https://image.zallhy.com/0193274b2dd9401880f7f29df14848a3?imageView/1/h/240/w/240",
                "pid": null,
                "cateList": null
            });
            this.data.cateData = response.data.list;
        });
        this.data.todayData = mock.todayData;
        this.data.loftData = mock.loftData;
        this.data.hotTopic = mock.hotTopic;
        this.data.disCover = mock.discoveryCover;
        this.data.disGoods = mock.discoveryGoods;
        this.data.guessData = getRandomArrayElements(mock.guessData,4);
    }
    renderCarousel = ({items}) => (
            <Carousel
                className="carousel"
                autoplay={false}
                infinite
                selectedIndex={0}
                swipeSpeed={35}>
                {items.map((item,index) => (
                    <a key={'carouse'+index} href={item.linkUrl}>
                        <img
                            src={item.image+'?imageView2/0/h/420/format/jpg'}
                            onLoad={() => {
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                    </a>
                ))}
            </Carousel>
    )
    _onCatePress = (item) => {
        const {router} = this.props;
        router.push({pathname: `/product_list/${item.id}`})
    }
    renderCategory = ({items}) => (
        <div className="category">
            <div className="container">
            {
                items.map((item,index)=> {
                    return (
                        <div key={'cate'+index} className="item" onClick={()=>{this._onCatePress(item)}}>
                             <div className="image"><img src={item.catepic}/></div>
                             <span className="text">{item.name}</span>
                       </div>
                    )
                })
            }
            </div>
        </div>
    )
    renderSeparatorBar = ({title,buttonText,onClick=()=>{}}) => (
        <div className="separator">
            <span className="text">{title}</span>
            {
                buttonText && <div className="button" onClick={onClick}>{buttonText}</div>
            }
        </div>
    )
    _onDayRecommendPress = (item) => {
        const {router} = this.props;
        router.push({pathname: `/product/tab1/${item.id}/`})
    }
    renderToDayRecommend = ({items}) => {
        return (
            <div className="recommend">
                {
                    items.map((item,index)=>{
                        return (
                            <div className="item" key={index+'day'} onClick={()=>{this._onDayRecommendPress(item)}}>
                                <ImageView src={item.url} width="1.6rem" height="1.6rem"/>
                                <span className="name">{item.name}</span>
                                <MoneyText money={item.price} style={{marginTop:'0.02rem',marginBottom:'0.10rem'}}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    renderLoftList = ({items}) => {
        return (
            <div className="loft">
                {
                    items.map((item,index)=>{
                        return (
                            <div className="item" key={index+'_item'}>
                                <this.renderSeparatorBar title={item.name}/>
                                <img className="banner" srcSet={item.cover.srcSet} src={item.cover.src}/>
                                <div className="topic">
                                    {
                                        item.topic.map((_topic, index) => {
                                            return (
                                                <div className="cell" key={index + '_topic'}>
                                                    <div className="title">{_topic.name}</div>
                                                    <div className="twins">
                                                        {
                                                            _topic.list.map((_list, index) => {
                                                                return (
                                                                    <div className="cell0">
                                                                        <ImageView src={_list.url} width="1.4rem" height="1.4rem"/>
                                                                        <span className="name">{_list.name}</span>
                                                                        <MoneyText money={_list.price} emptyText="议价" style={{marginTop: '0.02rem',marginBottom: '0.10rem'}}/>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="cate">
                                    {
                                        item.cate.map((_cate, index) => {
                                            return (
                                                <div className="cell" key={index + '_cate'}>
                                                    <span className="name">{_cate.name}</span>
                                                    <ImageView src={_cate.url} width="1.4rem" height="1.4rem"/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    renderHotTopic = ({items}) => {
        return (
            <div className="hotTopic">
                {
                    items.map((item,index)=>{
                        return(
                            <div className="item">
                                <ImageView src={item.url} width="2.4rem" height="3.4rem"/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    renderDisCover = ({items}) => {
        const left = items[0],right = items[1];
        return (
            <div className="disCover">
                <div className="leftCover">
                    <img srcSet={left.url.srcSet} src={left.url.src}/>
                    <span className="text">{left.name}</span>
                </div>
                <div className="rightCover">
                    <img srcSet={right.url.srcSet} src={right.url.src}/>
                    <span className="text">{right.name}</span>
                </div>
            </div>
        )
    }
    renderDisGoods = ({items}) => {
        return (
            <div className="disGoods">
                {
                    items.map((item,index)=>{
                        return (
                            <div className="item" key={"goods"+index}>
                                <div className="title">
                                    <span className="name">{item.name}</span>
                                    <span className="message">{item.message}</span>
                                </div>
                                <div className="cell">
                                    <img className="img0" srcSet={item.list[0].url.srcSet} src={item.list[0].url.src}/>
                                    <div className="child">
                                        <img className="img1" srcSet={item.list[1].url.srcSet} src={item.list[1].url.src}/>
                                        <img className="img2" srcSet={item.list[2].url.srcSet} src={item.list[2].url.src}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
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
    _onChangeBatch = ({items}) => {
        this.data.guessData = getRandomArrayElements(mock.guessData,4);
    }
    render() {
        return (
            <div className="home">
                <Title render="汉艺网商城"/>
                <LoadingView component={this.renderCarousel} items={this.data.carouselData} height="4rem"/>
                {/*分类信息*/}
                <LoadingView component={this.renderCategory} items={this.data.cateData} height="3rem"/>
                {/*今日推荐*/}
                <this.renderSeparatorBar title="今日推荐"/>
                <LoadingView component={this.renderToDayRecommend} items={this.data.todayData} height="2rem"/>
                {/*楼层信息*/}
                <LoadingView component={this.renderLoftList} items={this.data.loftData} height="6rem"/>
                {/*热门专题*/}
                <this.renderSeparatorBar title="热门专题"/>
                <LoadingView component={this.renderHotTopic} items={this.data.hotTopic} height="2.4rem"/>
                {/*发现好物*/}
                <this.renderSeparatorBar title="发现好物"/>
                <LoadingView component={this.renderDisCover} items={this.data.disCover} height="2rem"/>
                <LoadingView component={this.renderDisGoods} items={this.data.disGoods} height="2rem"/>
                <this.renderSeparatorBar title="猜你喜欢" buttonText="换一换" onClick={this._onChangeBatch}/>
                <LoadingView component={this.renderGuessLike} items={this.data.guessData} height="2rem"/>
            </div>
        );
    }
}

export default Home




