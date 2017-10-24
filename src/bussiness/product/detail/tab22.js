import React from 'react';
import { observable,action} from 'mobx'
import { observer } from 'mobx-react'
import {API,LoadingView} from 'components'
@observer
class Tab22 extends React.Component {
    data = observable({
        info:{
            productAttr: null
        }
    })
    componentDidMount() {
        const {params} = this.props;
        API.AppProduct_productDetailInfoSpec(params).then((response)=>{
            this.data.info = response.data;
            console.log(response.data)
        });
    }
    renderSpecList = ({items}) => {
        return (
            <div className="tab22">
                {
                    items.map((item,index)=>{
                        return (
                            <div className="rowLine">
                                <div className="rowLeft">{item.name}</div>
                                <div className="rowright">{item.value}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    render() {
        return (
            <LoadingView component={this.renderSpecList} items={this.data.info.productAttr} emptyText="该商品暂无规格信息" />
        )
    }
}
export default Tab22