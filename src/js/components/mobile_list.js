import React from 'react'
import {Row, Col} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'

export default class MobileList extends React.Component {
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
                        <section key={index} className='m_article list-item special_section clearfix'>
                            <Link to={`details/${newsItem.uniquekey}`}>
                                <div class="m_article_img">
                                    <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                                </div>
                                <div className="m_article_info">
                                    <div className="m_article_title">
                                        <span>{newsItem.title}</span>
                                    </div>
                                    <div className="m_article_desc clearfix">
                                        <div className="m_article_desc_l">
                                            <span className="m_article_channel">{newsItem.realtype}</span>
                                            <span className="m_article_time">{newsItem.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </section>
                    )
                })
            : <p>正在加载新闻</p>

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        )
    }
}