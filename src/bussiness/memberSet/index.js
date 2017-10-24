import React from 'react';
import { Button,InputItem,Toast,Flex,List,Icon,Badge  } from 'antd-mobile';
import {ImageView,API,Iconfont,request} from '../../components'
import {observer} from 'mobx-react'
import { observable,action} from 'mobx'
import './index.scss'
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var InterValObj;
var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
let _ = require('lodash');
@observer
class MemberSet extends React.Component {

    state = {
        moneyfocused: "password",
    }

    constructor(props) {

        super(props)
    }

    data = observable({
        telnum: "",
        djs: "发送验证码",
        fsstatus:false,
        newPassWord:'',
        confirmNewPassWord:'',
        newPassWordIcon:"https://image.zallhy.com/8b649382eb6d4b33805770bb8539544a",
        confirmNewPassWordIcon:"https://image.zallhy.com/8b649382eb6d4b33805770bb8539544a",
        newPassWordType:"password",
        confirmNewPassWordIconType:"password",
        random:"",
        userInputRandom:"",
        saveDisabled:true,
        saveDisabledColor:"#dffffff"

    })
    telChange = (value) => {
        this.data.telnum = value;
       if(this.checkData())
       {
           this.data.saveDisabled=false;
           this.data.saveDisabledColor="black"
       }

    }
    randomChange = (value) => {
        this.data.userInputRandom = value;
        if(this.checkData())
        {
            this.data.saveDisabled=false;
            this.data.saveDisabledColor="black"
        }
    }

    checkData = (value) => {

        if(this.data.telnum=="")
        {

            return false;
        }
        if(isMobile.test(this.data.telnum))
        {

            return false;
        }

        if(this.data.userInputRandom=="")
        {

            return false;
        }

       /* if(this.data.userInputRandom!=this.data.random)
        {

            return false;
        }*/

        if(this.data.newPassWord.length<6)
        {

            return false;
        }
        if(this.data.confirmNewPassWord.length<6)
        {

            return false;
        }

        return true;
    }

    confirmNewPassWordChange = (value) => {
        this.data.confirmNewPassWord = value;
        if(this.checkData())
        {
            this.data.saveDisabled=false;
            this.data.saveDisabledColor="black"
        }
    }
    newPassWordChange = (value) => {
        this.data.newPassWord = value;
        if(this.checkData())
        {
            this.data.saveDisabled=false;
            this.data.saveDisabledColor="black"
        }
    }
    newPassWord = (value) => {
        if(this.data.newPassWordIcon=="https://image.zallhy.com/8b649382eb6d4b33805770bb8539544a") {
            this.data.newPassWordIcon="https://image.zallhy.com/7e95e534cc564110a657b937334f5761"
            this.data.newPassWordType="";
        }
        else {
            this.data.newPassWordIcon="https://image.zallhy.com/8b649382eb6d4b33805770bb8539544a"
            this.data.newPassWordType="password";
        }
    }
    confirmNewPassWord = (value) => {
        if(this.data.confirmNewPassWordIcon=="https://image.zallhy.com/8b649382eb6d4b33805770bb8539544a") {
            this.data.confirmNewPassWordIcon="https://image.zallhy.com/7e95e534cc564110a657b937334f5761"
            this.data.confirmNewPassWordIconType="";
        }
        else
        {
            this.data.confirmNewPassWordIcon="https://image.zallhy.com/8b649382eb6d4b33805770bb8539544a"
            this.data.confirmNewPassWordIconType="password";
        }
    }


save=()=>
{



    if(this.data.telnum=="")
    {
        Toast.info('请输入手机号!!!', 1);
        return;
    }
    if(isMobile.test(this.data.telnum))
    {
        Toast.info('请输入正确的手机号!!!', 1);
        return;
    }

    if(this.data.userInputRandom=="")
    {
        Toast.info('请输入验证码!!!', 1);
        return;
    }

    if(this.data.userInputRandom!=this.data.random)
    {
        Toast.info('验证码不正确!!!', 1);
        return;
    }

    if(this.data.newPassWord.length<6)
    {
        Toast.info('请输入新密码，至少6位!!!', 1);
        return;
    }
    if(this.data.confirmNewPassWord.length<6)
    {
        Toast.info('请输入确认新密码，至少6位!!!', 1);
        return;
    }
    if(this.data.newPassWord!=this.data.confirmNewPassWord)
    {
        Toast.info('新密码与确认新密码不一致', 1);
        return;
    }

    API.appIndex_resetPassword({"userName":'13986104550',"password":this.data.newPassWord}).then((response)=>{

        if(response.success)
        {
            Toast.success('密码修改成功!!!', 1);
            return;
        }
        else
        {
            Toast.fail('密码修改失败!原因'+response.message, 1);
        }
    });

}
    send = () => {

        if(this.data.telnum=="")
        {
            Toast.info('请输入手机号!!!', 1);
            return;
        }
        if(isMobile.test(this.data.telnum))
        {
            Toast.info('请输入正确的手机号!!!', 1);
            return;
        }
        curCount = count;
        InterValObj = window.setInterval(this.SetRemainTime, 1000);
        this.data.djs="请在" + curCount + "秒内输入验证码";
        var monbile='139 86104 550';

        console.log("aaaaa",_.trim(monbile))
        API.appIndex_sendCode({"mobile":'13986104550'}).then((response)=>{

            this.data.random=response.data.random;
            console.log(response.data.random);
        });
        this.data.fsstatus=true;

    }

     SetRemainTime=()=> {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器

        this.data.djs="重新发送验证码";
        this.data.fsstatus=false;

    }
    else {
        curCount--;
        this.data.djs="请在" + curCount + "秒内输入验证码";
    }
}

    render() {
        return (
            <div style={{width:'100%'}}>
                   <div style={{width:'100%'}}>
                <InputItem value={this.data.telnum} onChange={this.telChange} type="phone" placeholder="输入手机号">+86     ></InputItem>
                   </div>
                <div style={{display: 'flex',  height: '0.89rem',  alignItems: 'center'}}>
                    <InputItem onChange={this.randomChange} placeholder="输入验证码" style={{flex: 1}}></InputItem>
                    <div className="yzm"><Button  style={{display: 'flex',  height: '0.92rem'}} disabled={this.data.fsstatus} onClick={this.send}>{this.data.djs}</Button>dd</div>
                </div>
                <InputItem maxLength="50" onChange={this.newPassWordChange} type={this.data.newPassWordType} extra={<img  onClick={this.newPassWord} src={this.data.newPassWordIcon} />} placeholder="请输入新密码"></InputItem>
                <InputItem  maxLength="50" onChange={this.confirmNewPassWordChange} type={this.data.confirmNewPassWordIconType} extra={<img  onClick={this.confirmNewPassWord } src={this.data.confirmNewPassWordIcon} />} placeholder="请确认输入新密码"></InputItem>
                <div className="bn">
                <Button disabled={this.data.saveDisabled} style={{width:'92%',color:"white",background:this.data.saveDisabledColor}} onClick={this.save}>保存</Button>
                </div>



{/*                <InputItem maxLength="50" onChange={this.newPassWordChange} type={this.data.newPassWordType} extra={<Iconfont type={require("svg/all.svg")} ></Iconfont>} placeholder="sss"></InputItem>*/}
            </div>

        );
    }
}

export default MemberSet