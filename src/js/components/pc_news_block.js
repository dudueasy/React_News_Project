import React from 'react'
import {Card} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'

// 引用示例: <PCNewsBlock count='20' type='top' bordered={false}/>

export default class PCNewsBlock extends React.Component {
    constructor() {
        super()

        // this.state.news 用来接收fetch() 获得的数据.
        this.state = {
            news: ''
        }
    }

    // 在生命周期函数中调用 fetch
    componentWillMount() {
        // 定义 fetch() 的选项
        let fetchOptions = {
            method: 'GET',
        }

        // 获取新闻列表的api

        // 聚合数据的API (不支持跨域, 只能使用JSONP)
        // let url = `http://v.juhe.cn/toutiao/index?type=${this.props.type}&key=3d57cecdb5bf7d47b1781d2384d6fc91`)

        // 使用 Parry 提供的API (新闻是去年的)
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?`
            + `action=getnews&type=${this.props.type}&count=${this.props.count}`
            ,fetchOptions)
             .then(response => response.json())
             .then(json => this.setState({news: json}))

    }

    render() {
        const news = this.state.news
        const newsList = news.length ?
            // 迭代this.state.news, 输出<li>对象.
            news.map(
                (newsItem, index) => {
                    return (
                        <li key={index}>
                            {/* 为每一个<link>对象定义一个跳转链接,  uniquekey 是来自json数据中的key*/}
                            <Link to={`details/${newsItem.uniquekey}/${this.props.type}`} target="_blank">
                                {newsItem.title}
                            </Link>
                        </li>)
                })
            : <p>正在加载新闻</p>

        return (
            <div class="topNewsList">
                <Card bordered={this.props.bordered}>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }
}