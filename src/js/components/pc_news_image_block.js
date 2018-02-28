import React from 'react'
import {Card} from 'antd'
import {Router, Route, Link, browserHistory, } from 'react-router-dom'

// 引用示例: <PCNewsImageBlock cardTitle='国际头条' count='6' type='guoji' width='400px' imageWidth='112px'/>

export default class PCNewsImageBlock extends React.Component {
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
        // 聚合数据的api (仅支持JSONP) `http://v.juhe.cn/toutiao/index?type=${this.props.type}&key=3d57cecdb5bf7d47b1781d2384d6fc91`

        // Parry 提供的API
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?`
            + `action=getnews&type=${this.props.type}&count=${this.props.count}`
            , fetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}))
    }

    render() {
        // 定义内联style, React内联style中的属性key用小驼峰法表示, 值用字符串表示
        const styleImage = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        }

        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }

        const news = this.state.news
        const newsList = news.length ?
            // 迭代this.state.news, 输出<li>对象.
            news.map((newsItem, index) => {
                    return (
                        <div key={index} class="imageblock">
                            {/* 为每一个<link>对象定义一个跳转链接,  uniquekey 是来自json数据中的key*/}
                            <Link to={`details/${newsItem.uniquekey}/${this.props.type}`} target="_blank">
                                <div>
                                    <img src={newsItem.thumbnail_pic_s} style={styleImage} alt="pic"/>
                                </div>
                                <div class="custom-card">
                                    <h3 style={styleH3}>{newsItem.title}</h3>
                                    <p style={styleH3}>来源: {newsItem.author_name}</p>
                                </div>
                            </Link>
                        </div>)
                })
            : <p>正在加载新闻</p>

        return (
            <div class="topNewsList">
                <Card title={this.props.cardTitle} bordered={false} noHovering={true}
                      style={{width: this.props.width}}>
                    {newsList}
                </Card>

            </div>
        )
    }
}