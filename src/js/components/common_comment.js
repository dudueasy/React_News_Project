import React from 'react';
import {
    Row, Col, Menu, Icon, Tabs, message, Form, Input,
    Button, Card, notification
} from 'antd';

const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane
const MenuItemGroup = Menu.ItemGroup

class CommonComments extends React.Component {
    constructor() {
        super()
        this.state = {
            comments: ''
        }
    }

    // 在生命周期中获取评论数据
    componentDidMount() {
        let fetchOptions = {
            method: 'GET'
        }

        // url中的uniquekey从react-router的路由参数中获取. 所以这里使用 this.props.match.params.key 来取值
        // 在 <route> 中应该写为 <Route component={PCNewsDetails} path='/details/:uniquekey'></Route>
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?` +
            `action=getcomments&uniquekey=${this.props.uniquekey}`

        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({comments: json})
            })
    }

    // 评论提交失败处理函数
    errorHandler() {
        message.error('请求失败')
    }

    // <Form> 表单提交处理函数
    handleSubmit(e) {
        // 阻止默认事件
        e.preventDefault()

        let fetchOptions = {
            method: 'GET'
        }

        let formdata = this.props.form.getFieldsValue()
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?`
            + `action=comment&userid=${localStorage.userid}&uniquekey=${this.props.uniquekey}&commnet=${formdata.remark}`
        fetch(url, fetchOptions)
            .then(response => response.json(), this.errorHandler)
            // 获取评论之后重新执行生命周期函数来重新加载组件自身, 实现评论的实时更新
            .then(json => this.componentDidMount())
    }

    // 收藏按钮点击处理函数
    addUserFavor() {
        let fetchOptions = {
            method: 'GET'
        }

        let url = `http://newsapi.gugujiankong.com/Handler.ashx?`
            + `action=uc&userid=${localStorage.userid}&uniquekey=${this.props.uniquekey}`

        fetch(url, fetchOptions)
            .then(response => response.json(), this.errorHandler)
            .then(json => {
                notification.success({message: 'ReactNews提醒', description: '收藏成功'})
            })
    }

    render() {
        let {getFieldDecorator} = this.props.form
        const comments = this.state.comments

        // 用户评论展示(只展示最近5条)
        let commentList = comments.length ?
            comments.slice([-5]).map((comment, index) => (
                    <Card bordered={false} key={index} title={'用户: ' + comment.UserName}
                          extra={<a href="#"> 发表于{comment.datetime}</a>} noHovering={true}
                    >
                        <p>{comment.Comments}</p>
                    </Card>
                )
            )
            :
            <p>目前没有任何评论</p>

        return (
            <div class="comment">
                <Row>
                    <Col span={24}>
                        <Card title='用户评论列表 (只显示最近5条)' bordered={false} noHovering={true}>
                            {commentList}
                        </Card>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label='您的评论'>
                                {getFieldDecorator('remark', {initialValue: ''})(<Input type='textarea'
                                                                                        placeholder='请输入评论'/>)}
                            </FormItem>
                            <Button type='primary' htmlType='submit'>提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type='primary' htmlType='button' onClick={this.addUserFavor.bind(this)}>
                                收藏文章
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

// 使用 Form.create 来包装组件
export default CommonComments = Form.create({})(CommonComments)

