import React from 'react'
import { observer } from 'mobx-react'
import { InputItem,Button,Icon,Flex,Toast } from 'antd-mobile';
import {Util,API} from 'components'
import { observable,action} from 'mobx'
import './index.scss'

@observer
class newLogin extends React.Component {

    state = {
        focused: false,
        focused1: false,
    }

    data = observable({
        username:"",
        pasw:"",
        pic1:"https://image.zallhy.com/e5608daff2f54465892e0650fa2ef293",//show
        pic2:"https://image.zallhy.com/73f5e793cca04f8b98c39145129e1015",//hide
        picshow:"https://image.zallhy.com/73f5e793cca04f8b98c39145129e1015",
        wxpic:"http://7xvu4i.com1.z0.glb.clouddn.com/fd9c123c5a2b47d48381a2d9aa3caaae",
        password:"",
        inputtype:"password",
        pictype:"1",//默认隐藏1,显示2
        butttype:"disabled",
        message:""
    })
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    exclick = () => {
           //debugger;
        if(this.data.password!=""){

            console.log(this.data.inputtype,this.data.pictype);
            if(this.data.pictype=="1"){

                this.data.inputtype="";
                this.data.pictype="2";//显示密码
                this.data.picshow=this.data.pic2;
                console.log(this.data.inputtype,this.data.pictype);

            }else if(this.data.pictype=="2"){

                this.data.inputtype="password";
                this.data.pictype="1";//显示**
                console.log(this.data.inputtype,this.data.pictype);
                this.data.picshow=this.data.pic1;
            }else{

                this.data.inputtype="";
                this.data.pictype="2";//显示密码
                this.data.picshow=this.data.pic2;
                console.log(this.data.inputtype,this.data.pictype);
            }




        }
    }

    uscontr = (val) =>{
        this.data.username=val;
        console.log(this.data.username);
    }

    pscontr = (val) => {

        this.data.password=val;
        if(this.data.password!==""){
            this.data.picshow=this.data.pic1;
        }else{
            this.data.picshow=this.data.pic2;
        }
        console.log(this.data.password);
    }

    tologin = () =>{

        if(this.data.username=="" && this.data.username==""){
            this.data.message="用户名不能为空!";
            this.showToastNoMask(this.data.message);
            return false;
        }else if(this.data.password=="" && this.data.password==""){
            this.data.message="用户密码不能为空!";
            this.showToastNoMask(this.data.message);
            return false;
        }

        console.log(this.data.butttype);
    }

     /*showToastNoMask = (val) => {
        //let mess={this.data.message}
            Toast.info(val, 2, null, false);
    }*/

    render() {

        return (

            <div style={{display:'flex', height: '92%', flexDirection:'column', justifyContent: 'space-between'}}>

                <div>

                    <InputItem  placeholder="用户名/手机号" style={{width: '7.5rem'}}  value={this.data.username} onChange={this.uscontr}> <span>账号</span></InputItem>

                    <InputItem type={this.data.inputtype} placeholder="请输入密码" extra={<img src={this.data.picshow}/>} onExtraClick={this.exclick}
                               value={this.data.password} onChange={this.pscontr}><span>密码</span></InputItem>

                    <Button className="btn"   type="primary" onClick={this.tologin}  style={{margin: '1.1rem auto 0rem',backgroundColor:'#404040',width:'7.1rem' }} >登录</Button>

                    <div style={{color:'#2b2b2b',textAlign: 'left',lineHeight:'0.6rem',lineHeight: '1.2rem', margin: '0.2rem'}} className="sub-title">
                        <Flex>
                            <Flex.Item style={{textAlign: 'left',}}>手机快速注册</Flex.Item>
                            <Flex.Item style={{textAlign: 'right',}}>找回密码</Flex.Item>
                        </Flex>
                    </div>
                </div>
                <div className="flex-container" style={{textAlign:'center',display: 'flex',flexdirection:'column',alignitems:'center'}}>

                    <img  src={this.data.wxpic}  className="inline" />{/* style={width:'80px', height: '80px'}*/}

                    <span className="inline" >微信登录</span>

                </div>

            </div>


        );
    }

}

export default newLogin