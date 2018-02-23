import React from 'react'
import {Card} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'

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
            method: 'GET'
        }

        // 获取新闻列表的api
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?`
            + `action=getnews&type=${this.props.type}&count=${this.props.count}`
            , fetchOptions)
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
                            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
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