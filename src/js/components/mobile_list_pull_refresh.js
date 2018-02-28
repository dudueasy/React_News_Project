import React from 'react'
import {Row, Col} from 'antd'
import {Router, Route, Link} from 'react-router-dom'
import ReactPullToRefresh from 'react-pull-to-refresh'
import Tloader from 'react-touch-loader'


export default class MobileListPullRefresh extends React.Component {
    constructor() {
        super()

        // this.state.news 用来接收fetch() 获得的数据.
        this.state = {
            news: '',
            count: 5,
            hasMore: 0,
            initializing: 1,
            refreshedAt: Date.now()
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

    // Tloader 组件的加载更多方法
    loadMore(resolve) {
        setTimeout(
            () => {
                let count = this.state.count
                this.setState({
                    count: count + 5
                })

                // 从 api 获取数据
                let fetchOptions = {
                    method: 'GET'
                }

                // 获取新闻列表的api
                fetch(`http://newsapi.gugujiankong.com/Handler.ashx?`
                    + `action=getnews&type=${this.props.type}&count=${this.state.count}`
                    , fetchOptions)
                    .then(response => response.json())
                    .then(json => this.setState({news: json}))

                // 判断是否还有需要加载的内容. 条件是50条数据以内.
                this.setState({hasMore: this.state.count > 0 && this.state.count < 50})

                // resolve方法结束加载更多的动画效果
                resolve()
            }, 2e3)
    }

// ReactPullToRefresh 组件的下拉刷新事件
    handleRefresh(resolve) {
        let fetchOptions = {
            method: 'GET'
        }

        // 获取新闻列表的api
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?`
            + `action=getnews&type=${this.props.type}&count=${this.props.count}`
            , fetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({news: json})

                // 这里使用 MobileListPullRefresh 组件自带的 resolve 方法来结束加载动画
                resolve()
            })
    }

    //Tloader 组件所需的设置
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                hasMore: 1,
                initializing: 2, // initialized
            });
        }, 2e3);
    }

    render() {
        const news = this.state.news
        const newsList = news.length ?
            // 迭代this.state.news, 输出<li>对象.
            news.map(
                (newsItem, index) => {
                    return (
                        <section key={index} className='m_article list-item special_section clearfix'>
                            <Link to={`details/${newsItem.uniquekey}/${this.props.type}`} target="_blank">
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
                        {/*使用下拉刷新组件*/}
                        <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)}
                                            style={{textAlign: 'center'}}>
                            {/*根据文档, 显示下拉图标和文本*/}
                            <span className='genericon genericon-next'/>
                            <div>
                                <Tloader className='main' onLoadMore={this.loadMore.bind(this)}
                                         hasMore={this.state.hasMore} initializing={this.state.initializing}>

                                    {newsList}
                                </Tloader>
                            </div>
                        </ReactPullToRefresh>
                    </Col>
                </Row>
            </div>
        )
    }
}