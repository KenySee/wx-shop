import React from 'react'
import {observer} from 'mobx-react'
import {Checkbox,Button,Badge} from 'antd-mobile'
import {API, LoadingView, ImageView, MoneyText, Title,Iconfont} from 'components'
import './index.scss'
@observer
class MemberAddrSet extends React.Component {
    constructor(props) {
        super(props)
    }
    add = (value) => {
        const {router} = this.props;
        router.push({pathname: `memberAddrSetAdd`})

    }
    componentDidMount() {

    }

    memberItemRender=(items)=>{
        return (
            <div>
                {/*店铺循环开始*/}
                <div className="memberItem">
                    <div className="memberItemTitle">
                        <div className="left">

                            <div>张晓肠</div>

                        </div>
                        <div className="right">
13987651334
                        </div>
                    </div>
                    <div className="memberInfoItemCenter">
                       折是个很长的地址啊
                    </div>
                    <div className="memberInfoItemBottom">
                        <div className="left">

                            <Checkbox style={{"margin-right": "5px"}}> 默认地址</Checkbox>

                        </div>
                        <div className="right">
                            编辑 删除
                         </div>
                    </div>


                </div>
                <div className="memberItem">
                    <div className="memberItemTitle">
                        <div className="left">

                            <div>张晓肠</div>

                        </div>
                        <div className="right">
                            13987651334
                        </div>
                    </div>
                    <div className="memberInfoItemCenter">
                        折是个很长的地址啊
                    </div>
                    <div className="memberInfoItemBottom">
                        <div className="left">

                            <Checkbox style={{"margin-right": "5px"}}> 默认地址</Checkbox>

                        </div>
                        <div className="right">
                            编辑 删除
                        </div>
                    </div>


                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='memberInfo'>
                <Title render="购物车"/>
                <div className="memberAddrCenter">
                    {this.memberItemRender()}
                </div>


                <div className="memberItemBottomBar">
                    <Button className="button" onClick={this.add}>新增收货地址</Button>
                </div>
            </div>
        )
    }
}

export default MemberAddrSet