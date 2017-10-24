import React,{PureComponent,PropTypes} from 'react'
import './ImageView.scss'
import {__assign} from '../index'

export default class ImageView extends PureComponent {
    render(){
        const {width,height,src,style,fixed} = this.props;
        const divStyle = __assign({width,height},style);
        if(fixed){
            return <img srcSet={src.srcSet} src={src.src} style={{width:width,height:height}}/>
        }
        else{
            return (
                <div className="imageView" style={divStyle}>
                    <img srcSet={src.srcSet} src={src.src} style={{maxWidth:width,maxHeight:height}}/>
                </div>
            )
        }
    }
}