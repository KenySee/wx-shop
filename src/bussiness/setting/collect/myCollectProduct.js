import React from 'react'
import {observer} from 'mobx-react'
import {Checkbox,Badge} from 'antd-mobile'
import {API, LoadingView, ImageView, MoneyText, Title,Iconfont} from '../../../components/index'
import './collect.scss'
@observer
class MyCollectProduct extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    shopItemRender=(items)=>{
        return (
            <div>
                {/*店铺循环开始*/}
                <div className="shopItem">
                    <div className="shopItemTop">
                        <div className="left">
                            <div className="shopItemCheckBox"><Checkbox></Checkbox></div>
                            <div style={{"margin-right": "10px"}} className="icon"><Iconfont colorful={false} type={"koubei"} size={"sm"} color={"#000"}></Iconfont></div>
                            <div style={{"margin-right": "5px","font-size": "26px"}}>汉艺网官方旗舰店</div>
                            <div className="icon"><Iconfont colorful={false} type={"right"} size={"sm"} color={"#878787"}></Iconfont></div>
                        </div>
                        <div className="right">
                            <div style={{"margin-right": "5px","font-size": "26px"}}>领券</div>
                            <div style={{"margin-right": "5px","font-size": "26px"}}>|</div>
                            <div style={{"margin-right": "5px","font-size": "26px"}}>完成</div>
                        </div>
                    </div>
                    {/*同店铺商品循环开始*/}
                    <div className="shopItemCenter">
                        <div className="shopItemCheckBox">
                            <Checkbox></Checkbox>
                        </div>
                        <div className="imgDiv">
                            <img src={"http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg"} alt=""/>
                        </div>
                        <div className="itemInfo">
                            <div className="top">玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代</div>
                            <div className="center">红色12</div>
                            <div className="bottom">
                                <MoneyText bigFont={30} smallFont={26} money={5800}></MoneyText>
                                <div className="right"><MoneyText style={{"text-decoration":"line-through"}} bigFont={24} smallFont={20} money={6000} color={"#878787"}></MoneyText></div>
                            </div>
                        </div>
                    </div>
                    <div className="shopItemCenter" style={{"margin-top": "5px"}}>
                        <div className="shopItemCheckBox">
                            <Checkbox></Checkbox>
                        </div>
                        <div className="imgDiv">
                            <img src={"http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg"} alt=""/>
                        </div>
                        <div className="itemInfo">
                            <div className="top">玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代</div>
                            <div className="center">红色12</div>
                            <div className="bottom">
                                <MoneyText bigFont={30} smallFont={26} money={5800}></MoneyText>
                                <div className="right"><MoneyText style={{"text-decoration":"line-through"}} bigFont={24} smallFont={20} money={6000} color={"#878787"}></MoneyText></div>
                            </div>
                        </div>
                    </div>
                    {/*循环结束*/}
                    <div className="shopItemBottom">
                        <div className="left">
                            <Badge text="满减" style={{marginRight: 12, padding: '0 0.06rem',backgroundColor: '#fff',height:36,width:66,borderRadius: 5,color: '#ff3a32', border: '1px solid #ff3a32',}}/>
                            <div>满500减去10</div>
                        </div>
                        <div></div>
                    </div>
                </div>


                <div className="shopItem" style={{"margin-top": "10px"}}>
                    <div className="shopItemTop">
                        <div className="left">
                            <div className="shopItemCheckBox"><Checkbox></Checkbox></div>
                            <div style={{"margin-right": "10px"}} className="icon"><Iconfont colorful={false} type={"koubei"} size={"sm"} color={"#000"}></Iconfont></div>
                            <div style={{"margin-right": "5px","font-size": "26px"}}>汉艺网官方旗舰店</div>
                            <div className="icon"><Iconfont colorful={false} type={"right"} size={"sm"} color={"#878787"}></Iconfont></div>
                        </div>
                        <div className="right">
                            <div style={{"margin-right": "5px","font-size": "26px"}}>领券</div>
                            <div style={{"margin-right": "5px","font-size": "26px"}}>|</div>
                            <div style={{"margin-right": "5px","font-size": "26px"}}>完成</div>
                        </div>
                    </div>
                    {/*同店铺商品循环开始*/}
                    <div className="shopItemCenter">
                        <div className="shopItemCheckBox">
                            <Checkbox></Checkbox>
                        </div>
                        <div className="imgDiv">
                            <img src={"http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg"} alt=""/>
                        </div>
                        <div className="itemInfo">
                            <div className="top">玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代</div>
                            <div className="center">红色12</div>
                            <div className="bottom">
                                <MoneyText bigFont={30} smallFont={26} money={5800}></MoneyText>
                                <div className="right"><MoneyText style={{"text-decoration":"line-through"}} bigFont={24} smallFont={20} money={6000} color={"#878787"}></MoneyText></div>
                            </div>
                        </div>
                    </div>
                    <div className="shopItemCenter" style={{"margin-top": "5px"}}>
                        <div className="shopItemCheckBox">
                            <Checkbox></Checkbox>
                        </div>
                        <div className="imgDiv">
                            <img src={"http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=fc00152191504fc2b652b8468db48d64/d4628535e5dde71143c1dadfadefce1b9d16618c.jpg"} alt=""/>
                        </div>
                        <div className="itemInfo">
                            <div className="top">玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代玻璃八宝鼻烟壶 明代</div>
                            <div className="center">红色12</div>
                            <div className="bottom">
                                <MoneyText bigFont={30} smallFont={26} money={5800}></MoneyText>
                                <div className="right"><MoneyText style={{"text-decoration":"line-through"}} bigFont={24} smallFont={20} money={6000} color={"#878787"}></MoneyText></div>
                            </div>
                        </div>
                    </div>
                    {/*循环结束*/}
                    <div className="shopItemBottom">
                        <div className="left">
                            <div>再买60减去10</div>
                        </div>
                        <div className="right">
                            <div>去凑单</div>
                            <div className="icon"><Iconfont colorful={false} type={"right"} size={"sm"} color={"#fa3232"}></Iconfont></div>
                        </div>
                    </div>
                </div>
                {/*店铺循环结束*/}
            </div>
        );
    }

    render() {
        return (
            <div className='shopcar'>
                <Title render="购物车"/>
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
                        <div>结算(1)</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCollectProduct