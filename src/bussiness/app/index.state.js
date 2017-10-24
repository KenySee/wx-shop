import { observable } from 'mobx'

class IndexState {
    tabBarConfig = observable({
        container: {
            unselectedTintColor: "#949494",
            tintColor: "#000",
            selectedTab: 'home',
            hidden: false
        },
        children: [{
                title: '首页',
                key: 'home',
                normalIcon: require('./image/gj_icon_sy_kx.png'),
                activeIcon: require('./image/gj_icon_sy_sx.png'),
                onClick: observable.ref(() => {
                    this.tabBarConfig.container.selectedTab = 'home'
                    window.appHistory.push(this.tabBarConfig.container.selectedTab)
                })
            },
            {
                title: '分类',
                key: 'category',
                normalIcon: require('./image/gj_icon_fl_kx.png'),
                activeIcon: require('./image/gj_icon_fl_sx.png'),
                onClick: observable.ref(() => {
                    this.tabBarConfig.container.selectedTab = 'category'
                    window.appHistory.push(this.tabBarConfig.container.selectedTab)
                })
            },
            {
                title: '直播',
                key: 'broadcast',
                normalIcon: require('./image/gj_icon_zb_kx.png'),
                activeIcon: require('./image/gj_icon_zb_sx.png'),
                onClick: observable.ref(() => {
                    this.tabBarConfig.container.selectedTab = 'broadcast'
                    window.appHistory.push(this.tabBarConfig.container.selectedTab)
                })
            },
            {
                title: '购物',
                key: 'shopcar',
                normalIcon: require('./image/gj_icon_gwc_kx.png'),
                activeIcon: require('./image/gj_icon_gwc_sx.png'),
                onClick: observable.ref(() => {
                    this.tabBarConfig.container.selectedTab = 'shopcar'
                    window.appHistory.push(this.tabBarConfig.container.selectedTab)
                })
            },
            {
                title: '我的',
                key: 'setting',
                normalIcon: require('./image/gj_icon_wd_kx.png'),
                activeIcon: require('./image/gj_icon_wd_sx.png'),
                onClick: observable.ref(() => {
                    this.tabBarConfig.container.selectedTab = 'setting'
                    window.appHistory.push(this.tabBarConfig.container.selectedTab)
                })
            }
        ]
    })
}

export default new IndexState()