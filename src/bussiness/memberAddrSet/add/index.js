import React from 'react';
import { InputItem,TextareaItem,Toast,Picker,List,Switch,Button} from 'antd-mobile';
import {Iconfont,API} from '../../../components'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import './index.scss'
let areinfo="";
let xz="";
@observer
class memberAddrSetAdd extends React.Component {
    data = observable({
        gdStatus: false,
        province:[],
        asyncValue: [],
        asyncName:'',
        memberName:'',
        mobile:'',
        addressInfo:'',
        state:2,


    })
    componentDidMount() {
        API.appMemberInfo_getRegionByParentId({"parentId":'0'}).then((response)=>{
            console.log(response.data.list)
            let plist=response.data.list;

            let objList=[];
            for(let i=0;i<plist.length;i++)
            {
                let obj={"label":plist[i].regionName,"value":plist[i].id,"parentId":plist[i].parentId}
                objList.push(obj);
            }
            this.data.province=objList;

        });
    }
    gdClick = (value) => {
        console.log(value)
       this.data.gdStatus=value;
    }
    memberNameChange = (value) => {
        this.data.memberName = value;
    }

    mobileChange = (value) => {
        this.data.mobile = value;
    }
    addressInfoChange = (value) => {
        this.data.addressInfo = value;
    }


    save = () => {
        for(let i=0;i<this.data.province.length;i++)
        {
            if(this.data.asyncValue[0]==this.data.province[i].value)
            {
                areinfo+=this.data.province[i].label

                if(this.data.province[i].children) {
                    let city = this.data.province[i].children;
                    for (let j = 0; j < city.length; j++)
                    {
                        if(this.data.asyncValue[1]==city[j].value)
                        {

                            areinfo+=city[j].label
                            if(city[j].children)
                            {
                                let jd=city[j].children;
                                for(let h=0;h<jd.length;h++)
                                {
                                    if(this.data.asyncValue[2]==jd[h].value)
                                    {

                                        areinfo+=jd[h].label
                                    }
                                }
                            }
                        }

                    }
                }
            }


        }



        if (this.data.memberName == "")
        {
            Toast.info('请输入收货人!!!', 1);
            return;
        }

        if (this.data.mobile == "")
        {
            Toast.info('请输入联系电话!!!', 1);
            return;
        }
       if(this.data.asyncValue[0]==undefined)
       {
          Toast.info('请选择省!!!', 1);
          return;
       }
        if(this.data.asyncValue[1]==undefined)
        {
            Toast.info('请选择市!!!', 1);
            return;
        }

        if(this.data.addressInfo=="")
        {
            Toast.info('请输入详细地址!!!', 1);
            return;
        }

if(this.data.gdStatus)
{
    xz=1
}
else
{
    xz=2
}
       API.appMemberInfo_saveaddress({"member_id":'69',"state":xz,
           "member_name":this.data.memberName,"mobile":this.data.mobile,"add_all":areinfo,
           "address_info":this.data.addressInfo,
           "province_id":this.data.asyncValue[0],"city_id":this.data.asyncValue[1],
           "area_id":this.data.asyncValue[2]}).then((response)=>{
           console.log(response.success)
        });

    }


    onPickerChange = (value) => {
        let vls = value
        const asyncValue =  [...this.data.asyncValue];
        const rtnpm = [...value];
        const rtnpmName = [...value];
        let objList = [];
            const d = [...this.data.province];
            d.forEach((i) => {
                if(vls.length==1) {
                    if (i.value == vls[0]) {
                        if (!i.children) {
                            API.appMemberInfo_getRegionByParentId({"parentId": vls[0]}).then((response) => {
                                let plist = response.data.list;

                                for (let i = 0; i < plist.length; i++) {
                                    let obj = {
                                        "label": plist[i].regionName,
                                        "value": plist[i].id,
                                        "parentId": plist[i].parentId
                                    }
                                    objList.push(obj);

                                }
                               // console.log("aaaaaaaaaaaaaaaaaaaaaaaaa",objList[0].value)
                                i.children = objList;
                                rtnpm.push(objList[0].value);
                                rtnpmName.push(objList[0].label);
                                this.data.asyncValue=rtnpm;
                                this.data.asyncName=rtnpmName;


                            });

                        }
                    }
                }
                else
                {
                    if (i.value == vls[0]) {
                        console.log("11111111111", i)
                        i.children.forEach((j) => {
                            if (j.value == vls[1]){


                                    API.appMemberInfo_getRegionByParentId({"parentId": vls[1]}).then((response) => {
                                        let plist = response.data.list;
                                        for (let i = 0; i < plist.length; i++) {
                                            let obj = {
                                                "label": plist[i].regionName,
                                                "value": plist[i].id,
                                                "parentId": plist[i].parentId
                                            }
                                            objList.push(obj);
                                        }
                                        j.children = objList;
                                        rtnpm.push(objList[0].value);
                                        this.data.asyncValue=rtnpm;
                                        rtnpmName.push(objList[0].label);
                                        this.data.asyncName=rtnpmName;
                                    });



                            }


                        });
                    }
                }
            });

    }

    onClick = (value) => {


    }
    render() {
        return (
            <div style={{width:"100%"}}>
            <InputItem
                onChange={this.memberNameChange}
            >收货人</InputItem>

                <InputItem
                    onChange={this.mobileChange}
                >联系电话</InputItem>
                <Picker
                    data={this.data.province}
                    onPickerChange={this.onPickerChange}
                    cols="3"
                    value={this.data.asyncValue}
                >
                    <List.Item arrow="horizontal" onClick={this.onClick}>选择地区</List.Item>
                </Picker>

                <TextareaItem  onChange={this.addressInfoChange}
                    placeholder="请填写详细地址"
                    autoHeight
                    rows="3"
                    labelNumber={5}
                />

              {/*  <InputItem

                >邮政编码</InputItem>
*/}                <List.Item
                    extra={<Switch checked={this.data.gdStatus} onClick={this.gdClick}></Switch>}>设为默认</List.Item>

                <div className="bn">
                    <Button style={{width:'92%'}} onClick={this.save}>保存</Button>
                </div>
            </div>
        );
    }
}

export default memberAddrSetAdd