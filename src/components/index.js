export {default as TabBar} from './TabBar'
export {default as GlobalConstants} from './base/GlobalConstants'
export {default as LoadingView} from './base/LoadingView'
export {default as ImageView} from './base/ImageView'
export {default as Util} from './lib/util'
export {default as DbHelper} from './lib/dbHelper'
export {default as API} from './api'
export {default as MoneyText} from './base/MoneyText'
export {default as Title} from 'react-title-component'
export Iconfont from './Iconfont'
import _ from 'lodash'
export const formatMoney=(money)=>{
    if(_.isNumber(money)){
        money = _.round(money,2);
        //判断是否有两位小数，不足补0
        let s = money.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        money = s;
    }
    return money==null ? '0.00' : money;
}
export const __assign = (this && this.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
};