import 'whatwg-fetch'

import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, useRouterHistory } from 'react-router'
import { createHistory, useBasename } from 'history'
import router from './app.router'
import appState from './app.state'
import './app.scss'


init()

async function init() {
    await appState.initConfig()
    const appHistory = useRouterHistory(createHistory)({
        basename: process.env.NODE_ENV == 'development' ? '/' : '/h5'
    })
    window.appHistory = appHistory
    window.appState = appState
    render((
        <Router history={appHistory} routes={router}>
        </Router>
    ), document.getElementById('content'))
}