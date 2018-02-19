import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, hashHistory, Link} from 'react-router'
import 'antd/dist/antd.css'
import PCIndex from './components/pc_index'

//这里变成了程序的正则入口
export default class Root extends React.Component {
    render() {
        return (
            <div>
                <PCIndex/>
            </div>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById('mainContainer'))