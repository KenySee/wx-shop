import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import {Checkbox,Badge} from 'antd-mobile'
import {API, LoadingView, ImageView, MoneyText, Title,Iconfont} from '../../../components/index'
import './collect.scss'
@observer
class MyCollectSeller extends React.Component {
    constructor(props) {
        super(props)
    }
    state=observable({
        mySellers:[
            {sellerName:'aaaa',xing:'5',sc_count:'10',fb_count:'200',headImg:'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg'},
            {sellerName:'bbb',xing:'3',sc_count:'101',fb_count:'220',headImg:'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg'},
            {sellerName:'cccc',xing:'2',sc_count:'103',fb_count:'240',headImg:'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg'},
            {sellerName:'dddd',xing:'3',sc_count:'104',fb_count:'201',headImg:'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg'},
            {sellerName:'eeee',xing:'4',sc_count:'105',fb_count:'208',headImg:'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg'},

        ]
    })

    componentDidMount() {

    }



    sellerRow=(items)=>{
        return (
            <div className="shopItemCenter">
                <div className="shopItemCheckBox">
                    <Checkbox></Checkbox>
                </div>
                <div className="imgDiv">
                    <img src={"http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg"} alt=""/>
                </div>
                <div className="itemInfo">
                    <div className="top">玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代</div>
                    <div className="icon" style={{"width": ".4rem"}}><Iconfont  type={require('svg/setting/grzx_icon_gzsp.svg')} /></div>
                    <div className="center" ></div>
                </div>
            </div>
         );
     }


    shopItemRender=()=>{
        return (
            <div className="shopItem">
                <div className="shopItemTop">
                        <div className="left">
                            <div className="shopItemCheckBox"><Checkbox></Checkbox></div>
                            <div style={{"margin-left": "10px","width": ".2rem"}} className="icon"></div>
                            <div style={{"margin-right": "5px"}}>全选</div>
                            <div className="icon"><Iconfont colorful={false} type={"right"} size={"sm"} color={"#878787"}></Iconfont></div>
                        </div>
                        <div className="right">
                            <div className="icon" style={{"width": ".4rem"}}><Iconfont  type={require('svg/setting/grzx_icon_xgmm.svg')} /></div>
                            <div style={{"margin-right": "5px"}}>编辑</div>
                        </div>
                </div>
             {
                    <LoadingView component={this.sellerRow} items={this.state.mySellers} height="2rem"/>
             }
            </div>
                );

      }

    render() {
        return (

            <div className='shopcar'>
                <Title render="购物车aaaa"/>
                <div className="shopCenter">
                    {this.shopItemRender()}
                    <div style={{width:'100%',height:30}}></div>
                </div>
                <div className="shopBottomBar">
                    <div className="shopBottomBarItemLeft">
                        <div><Checkbox style={{"margin-right": "5px"}}></Checkbox></div>
                        <div>全选</div>
                    </div>
                    <div className="shopBottomBarItemCenter">
                        <span style={{"font-size": "30px"}}>合计：</span>
                        <MoneyText bigFont={30} smallFont={26} money={5800}></MoneyText>
                    </div>
                    <div className="shopBottomBarItemRight">
                        <div>结算(12222)</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCollectSeller