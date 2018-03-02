import React from 'react'
import {Row, Col, BackTop} from 'antd'
import PCNewsImageBlock from './pc_news_image_block'
import CommonComments from './common_comment'


import PCHeader from './pc_header'
import PCFooter from './pc_footer'
// 引用示例 (路由):  <Route path='/details/:uniquekey(/:type)' component={PCNewsDetails}></Route>

export default class PCNewsDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            newsItem: ''
        }
    }

    componentDidMount() {
        let fetchOptions = {
            method: 'GET'
        }

        // url中的uniquekey从react-router的路由参数中获取. 所以这里使用 this.props.match.params.key 来取值
        // 在 <route> 中应该写为 <Route component={PCNewsDetails} path='/details/:uniquekey'></Route>
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?` +
            `action=getnewsitem&uniquekey=${this.props.match.params.uniquekey}`

        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json})
                document.title = `${this.state.newsItem.title} - React News | React 驱动的新闻平台`
            })
    }

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent}
    }

    render() {

        return (
            <div class="news-detail-wrapper">
                <PCHeader/>
                <Row>
                    <Col span={2}/>
                    <Col span={16} className='container'>

                        {/* 插入HTML字符 (这个需求是由api的返回数据决定的) */}
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}>
                        </div>

                        {/*加载评论组件*/}
                        <CommonComments uniquekey={this.props.match.params.uniquekey} count={5}/>
                    </Col>
                    <Col span={4}>
                        <PCNewsImageBlock cardTitle='相关新闻' count='40' type={this.props.match.params.type} imageWidth='160px'/>
                    </Col>
                    <Col span={2}/>

                </Row>
                <PCFooter/>
                <BackTop/>
            </div>
        )
    }
}