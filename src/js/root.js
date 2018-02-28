import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, BrowserRouter, Link, Switch} from 'react-router-dom'

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
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={PCIndex}/>
                            <Route path='/details/:uniquekey/:type?' component={PCNewsDetails}/>
                            <Route path='/usercenter' component={PCUserCenter}/>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={MobileIndex}/>
                            <Route path='/details/:uniquekey/:type?' component={MobileDetail}/>
                            <Route path='/usercenter' component={MobileUserCenter}/>
                        </Switch>

                    </BrowserRouter>
                </MediaQuery>
            </div>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById('mainContainer'))