import React from 'react'
import PropTypes from 'prop-types'
import { Icon} from 'antd-mobile';
import './iconfont.scss'

const Iconfont = ({ type,size,color}) => {
  return <Icon type={type} size={size} style={{color:color}}/>;
}

Iconfont.propTypes = {
    type: PropTypes.string,
    size:PropTypes.string,
    color:PropTypes.string,
}

export default Iconfont
