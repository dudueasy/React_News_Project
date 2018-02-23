import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, hashHistory, Link} from 'react-router'
import 'antd/dist/antd.css'
import PCIndex from './components/pc_index'
import MobileIndex from './components/mobile_index'

import MediaQuery from 'react-responsive'

//这里变成了程序的正则入口
export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <PCIndex/>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <MobileIndex/>
                </MediaQuery>
            </div>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById('mainContainer'))