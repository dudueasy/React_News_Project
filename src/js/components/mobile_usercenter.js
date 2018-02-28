import React from 'react';
import {
    Row, Col,
    Menu, Icon,
    Tabs, message,
    Form, Input,
    Button, Checkbox,
    Modal, Upload,
    Card
} from 'antd';

import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'

const TabPane = Tabs.TabPane
const FormItem = Form.Item


export default class MobileUserCenter extends React.Component {
    constructor() {
        super()
        this.state = {
            previewVisible: false,
            previewImage: '',
            userCollection: '',
            userComments: '',
        }
    }

    handleCancel() {
        this.setState({previewVisible: false})
    }

    // ======== 在生命周期函数中获取用户收藏和用户评论 ========
    componentDidMount() {
        document.title = `个人中心 - React News | React 驱动的新闻平台`

        let fetchOptions = {
            method: 'GET'
        }

        // ======== 获取用户收藏 ========
        let getUserCollectionUrl = `http://newsapi.gugujiankong.com/Handler.ashx`
            + `?action=getuc&userid=${localStorage.userid}`

        fetch(getUserCollectionUrl, fetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({userCollection: json})
            })

        // ======== 获取用户评论 ========
        let getCommentsUrl = `http://newsapi.gugujiankong.com/Handler.ashx`
            + `?action=getusercomments&userid=${localStorage.userid}`

        fetch(getCommentsUrl, fetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({userComments: json})
            })
    }

    render() {
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: "xxx.png",
                    state: 'done',
                    url: "https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
                    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                }
            ],
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true})
            }
        }

        // ======== 通过用户收藏数据渲染React元素 ========
        const userCollection = this.state.userCollection
        const userCollectionList = userCollection.length ?
            userCollection.map((data, index) => {
                return (
                    <Card key={index} title={`文章id:${data.uniquekey}`} bordered={false} noHovering={true}
                          extra={<a href={`/#/details/${data.uniquekey}/top`}> 查看</a>}>
                        <p>标题: {data.Title}</p>
                    </Card>)
            })
            :
            <p>没有用户收藏数据</p>

        // ======== 通过用户评论数据渲染React元素 ========
        const userComments = this.state.userComments
        const userCommentsList = userComments.length ?
            userComments.map((data, index) => {
                return (
                    <Card key={index} title={`评论于 ${data.datetime}`} bordered={false}
                          noHovering={true}
                          extra={<a href={`/#/details/${data.uniquekey}/top`}> 查看</a>}>
                        <p>{data.Comments}</p>
                    </Card>)
            })
            :
            <p>没有用户评论数据</p>


        return (
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab='我的收藏列表' key='1'>
                                <div>
                                    <Row>
                                        <Col span="1"/>

                                        <Col span="22">
                                            {userCollectionList}
                                        </Col>
                                        <Col span="1"/>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab='我的评论列表' key='2'>
                                <div>
                                    <Row>
                                        <Col span="1"/>
                                        <Col span="22">
                                            {userCommentsList}
                                        </Col>
                                        <Col span="1"/>
                                    </Row>
                                </div>


                            </TabPane>
                            <TabPane tab='头像设置' key='3'>
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type='plus'>
                                            <div className='ant-upload-text'>上传图片</div>
                                        </Icon>
                                        <Modal visible={this.state.previewVisible} footer={null}
                                               onCancel={this.handleCancel.bind(this)}>
                                            <img src={this.state.previewImage} alt="预览"/>

                                        </Modal>
                                    </Upload>
                                </div>

                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter/>
            </div>
        )
    }
}