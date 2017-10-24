import App from './bussiness/app'
import Main from './bussiness/main'

import indexState from './bussiness/main/index.state'
import {productState} from './bussiness/product/detail'
import {productTab2State} from './bussiness/product/detail/tab2'
const routeConfig = [{
    path: '/',
    component: App,
    onEnter: function(nextState, replaceState) {
        let pathName = nextState.location.pathname.replace(/^\//,'')
        if (pathName == '') {
            replaceState(`main/home`)
        }
        else if(pathName.indexOf('main') != -1){
            indexState.tabBarConfig.container.selectedTab = pathName;
            console.log('main',pathName);
        }
    },
    childRoutes: [
        {

            path: 'shopOrder',
            getComponents(location, callback) {
            require.ensure([], function(require) {
                callback(null, require('./bussiness/shopcar/order').default)
            })
        }
        },
        {
            path: 'order_detail/:orderId',
            getComponents(location, callback) {
                require.ensure([], function(require) {
                    callback(null, require('./bussiness/order').default)
                })
            }
        },{
            path: 'newlogin',
            getComponents(location, callback) {
                require.ensure([], function(require) {
                    callback(null, require('./bussiness/newlogin').default)
                })
            }
        },
        {
            path: 'memberAddrSet',
            getComponents(location, callback) {
                require.ensure([], function(require) {
                    callback(null, require('./bussiness/memberAddrSet/list').default)
                })
            }

        },
        {
            path: 'memberAddrSetAdd',
            getComponents(location, callback) {
                require.ensure([], function(require) {
                    callback(null, require('./bussiness/memberAddrSet/add').default)
                })
            }

        },

        {
            path: 'memberPassword',
            getComponents(location, callback) {
                require.ensure([], function(require) {
                    callback(null, require('./bussiness/memberSet').default)
                })
            }

        },
        {
            path: 'product',
            getComponents(location, callback) {
                require.ensure([], function(require) {
                    callback(null, require('./bussiness/product/detail').default)
                })
            },
            onEnter: function(nextState, replaceState) {
                let path = nextState.location.pathname.split('/');
                productState.currentPath = path[1];
            },
            childRoutes: [
                {
                    path: 'tab1/:productId(/:userId)',
                    getComponents(location, callback) {
                        require.ensure([], function(require) {
                            callback(null, require('./bussiness/product/detail/tab1').default)
                        })
                    }
                },{
                    path: 'tab2',
                    getComponents(location, callback) {
                        require.ensure([], function(require) {
                            callback(null, require('./bussiness/product/detail/tab2').default)
                        })
                    },
                    onEnter: function(nextState, replaceState) {
                        let path = nextState.location.pathname.split('/');
                        productTab2State.currentPath = path[2];
                    },
                    childRoutes: [
                        {
                            path: 'tab21/:productId(/:userId)',
                            getComponents(location, callback) {
                                require.ensure([], function(require) {
                                    callback(null, require('./bussiness/product/detail/tab21').default)
                                })
                            }
                        },{
                            path: 'tab22/:productId(/:userId)',
                            getComponents(location, callback) {
                                require.ensure([], function(require) {
                                    callback(null, require('./bussiness/product/detail/tab22').default)
                                })
                            }
                        }
                    ]
                },{
                    path: 'tab3/:productId(/:userId)',
                    getComponents(location, callback) {
                        require.ensure([], function(require) {
                            callback(null, require('./bussiness/product/detail/tab3').default)
                        })
                    }
                }

            ]
        },{
            path: 'product_list/:productCate',
            getComponents(location, callback) {
                require.ensure([], function(require) {
                    callback(null, require('./bussiness/product/list').default)
                })
            }
        },{

            path: 'main',
            component: Main,
            onEnter: function(nextState, replaceState){
            },
            childRoutes: [{
                path: 'home',
                getComponents(location, callback) {
                    require.ensure([], function(require) {
                        callback(null, require('./bussiness/home').default)
                    })
                }
            },{
                path: 'category',
                getComponents(location, callback) {
                    require.ensure([], function(require) {
                        callback(null, require('./bussiness/category').default)
                    })
                }
            },{
                path: 'broadcast',
                getComponents(location, callback) {
                    require.ensure([], function(require) {
                        callback(null, require('./bussiness/broadcast').default)
                    })
                }
            },{
                path: 'shopcar',
                getComponents(location, callback) {
                    require.ensure([], function(require) {
                        callback(null, require('./bussiness/shopcar').default)
                    })
                }
            },{
                path: 'setting',
                getComponents(location, callback) {
                    require.ensure([], function(require) {
                        callback(null, require('./bussiness/setting').default)
                    })
                },



            },

                {
                    path: 'myColSeller',
                    getComponents(location, callback) {
                        require.ensure([], function (require) {
                            callback(null, require('./bussiness/setting/collect/myCollectSeller').default)
                        })
                    }
                },{
                    path: 'myColProduct',
                    getComponents(location, callback) {
                        require.ensure([], function (require) {
                            callback(null, require('./bussiness/setting/collect/myCollectProduct').default)
                        })
                    }
                }

               ]
        }
    ]
}]

export default routeConfig