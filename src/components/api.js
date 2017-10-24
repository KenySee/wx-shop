import { FetchHttpResource } from '../components/es6-http-utils';
import config from '../config'
const Api = new FetchHttpResource(config.host, {}, {
    appIndex_index_banner: {method: "POST",url: "/appIndex/index_banner.html", params:{"pageNum": 1, "pageSize": 12}},
    appIndex_recommend_cate: {method: "POST",url: "/appIndex/recommend_cate.html", params:{"pageNum": 1, "pageSize": 9}},
    AppProduct_list_product: {method: "POST",url: "/AppProduct/list_product.html"},
    AppProduct_getProductDetail: {method: "POST",url: "/AppProduct/getProductDetail.html"},
    AppProduct_getproductactinfo: {method: "POST",url: "/AppProduct/getproductactinfo.html"},
    AppProduct_productDetailInfoSpec: {method: "POST",url: "/AppProduct/productDetailInfoSpec.html"},
    AppProduct_productComment: {method: "POST",url: "/AppProduct/productComment.html"},
    AppOrder_getOrderDetail: {method: "POST",url: "/AppOrder/getOrderDetail.html", params:{"pageNum": 1, "pageSize": 9}},

//    购物车
    appMemberInfo_getMemberCart:{method:"post",url:"/appMemberInfo/getMemberCart.html"},
    AppOrder_updateCartById:{method:"post",url:"/AppOrder/updateCartById.html"},
    AppOrder_deleteCartById:{method:"post",url:"/AppOrder/deleteCartById.html"},
    AppOrder_cartCheckedmany:{method:"post",url:"/AppOrder/cartCheckedmany.html"},
    AppSeller_seller_coupon:{method:"post",url:"/AppSeller/seller_coupon.html"},
    AppProduct_reveivecoupon:{method:"post",url:"/AppProduct/reveivecoupon.html"},

    //提交订单
    appMemberInfo_DefultAddress:{method:"post",url:"/appMemberInfo/DefultAddress.html"},
    AppOrder_calculateTransFee:{method:"post",url:"/AppOrder/calculateTransFee.html"},
    AppOrder_order_CommitOrder:{method:"post",url:"/AppOrder/order/CommitOrder.html"},


    //个人中心密码
    appIndex_sendCode: {method: "POST",url: "/appIndex/sendCode.html"},
    appIndex_resetPassword: {method: "POST",url: "/appIndex/resetPassword.html"},
    appMemberInfo_getRegionByParentId:{method: "POST",url: "/appMemberInfo/getRegionByParentId.html"},
    appMemberInfo_saveaddress:{method: "POST",url: "/appMemberInfo/saveaddress.html"}

})
export default Api