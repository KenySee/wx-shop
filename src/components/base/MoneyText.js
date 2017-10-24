const React = require('react');
import {formatMoney,__assign} from '../index'
const MoneyText = (props) => {
    const {style,money,emptyText,color,bigFont,smallFont,className} = props;
    const bstyle = __assign({fontSize:bigFont||'0.16rem',color:color||'#ff3232'},style);
    if((money == null || money === 0 || money === '0.00' || money === '0') && emptyText!=null){
        return (
            <span className={className} style={bstyle}>{emptyText}</span>
        )
    }
    else{
        const showText = formatMoney(money);
        const bigNum = showText.substr(0,showText.indexOf('.'));
        const smallNum = showText.substr(showText.indexOf('.')+1);
        return (
            <div className={className} style={bstyle}><span style={{fontSize:smallFont||'0.12rem'}}>¥</span>{bigNum}.
                <span style={{fontSize:smallFont||'0.12rem'}}>{smallNum}</span>
            </div>
        )
    }

};
module.exports = MoneyText;