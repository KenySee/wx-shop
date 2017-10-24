import React from 'react';
import {Iconfont} from 'components'
class Category extends React.Component {

    render() {
        return (
            <div className='cate'>
                <Iconfont type={require('svg/all.svg')} className='icon'/>
            </div>
        );
    }
}

export default Category