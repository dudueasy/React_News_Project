import React from 'react'
import {Row, Col} from 'antd'
import PCHeader from './pc_header'
import PCFooter from './pc_footer'

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

        // url中的uniquekey从react-router的路由参数中获取. 所以这里使用 this.props.params.key 来取值
        // 在 <route> 中应该写为 <Route component={PCNewsDetails} path='/details/:uniquekey'></Route>
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?` +
            `action=getnewsitem&uniquekey=${this.props.params.uniquekey}`

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
            <div>
                <PCHeader/>
                <Row>
                    <Col span="2"></Col>
                    <Col span="14" className='container'>
                        {/*插入特殊字符 (这里的需求是由api的返回数据决定的) */}
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}>

                        </div>
                    </Col>
                    <Col span="6"></Col>
                    <Col span="2"></Col>

                </Row>
                <PCFooter/>
            </div>
        )
    }
}