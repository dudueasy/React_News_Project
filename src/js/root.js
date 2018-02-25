import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, hashHistory, Link} from 'react-router'
import 'antd/dist/antd.css'
import MediaQuery from 'react-responsive'

// 导入pc端的组件
import PCIndex from './components/pc_index'
import PCNewsDetails from './components/pc_news_details'
import PCUserCenter from './components/pc_usercenter'

// 导入移动端的组件
import MobileIndex from './components/mobile_index'
import MobileDetail from './components/mobile_news_details'
import MobileUserCenter from './components/mobile_usercenter'



//程序入口
export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Route path='/' component={PCIndex}></Route>
                        <Route path='/details/:uniquekey(/:type)' component={PCNewsDetails}></Route>
                        <Route path='/usercenter' component={PCUserCenter}></Route>


                    </Router>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Route path='/' component={MobileIndex}></Route>
                        <Route path='/details/:uniquekey(/:type)' component={MobileDetail}></Route>
                        <Route path='/usercenter' component={MobileUserCenter}></Route>


                    </Router>
                </MediaQuery>
            </div>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById('mainContainer'))