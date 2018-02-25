import React from 'react'
import {
    Row, Col,
    Menu, Icon,
    Tabs, message,
    Form, Input,
    Button, Checkbox,
    Modal,
} from 'antd';

import {Link} from 'react-router'

const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane
const MenuItemGroup = Menu.ItemGroup


class MobileHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogin: false,
            userNickName: '',
            userid: 0
        }
    }

// 在组件被渲染之前会执行
    componentWillMount() {
        // 根据 localStorage 来决定用户登陆状态
        if (localStorage.userid && localStorage.userNickName) {
            this.setState({hasLogin: true, userNickName: localStorage.userNickName})
        }
    }

    setModalVisible(value) {
        this.setState({modalVisible: value})
    }

    handleClick(e) {
        if (e.key === 'register') {
            this.setModalVisible(true)
        }
        console.log(e.key)
        this.setState({current: e.key})
    }

    // 处理 <Tab> 的onChange 事件, 当切换标签 <TabPane> 的时候, 修改 this.state.action,实现动态传参给fetch()的get请求
    // <Tab> 的 onChange 事件会默认传入当前 <TabPane> 的key, 是一个字符串
    handleTabChange(key) {
        if (key === "1") {
            this.setState({action: 'login'})
        } else {
            this.setState({action: 'register'})
        }
    }

    // 调用Fetch API来实现注册
    handleSubmit(e) {
        e.preventDefault()

        // 设置 fetch 选项
        let myFetchOptions = {
            method: 'GET'
        }

        // 获得 form 的值
        let formData = this.props.form.getFieldsValue();
        // 查看 formData
        // console.log(formData)

        // 输出请求的action: 注册/登录
        console.log(this.state.action)

        // 使用 fetch() 发起请求
        // 在请求的地址中, username 和 password 对应的是登陆信息, r_userName, r_password 和 r_confirmPassword 对应的是注册信息
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?`
            + `action=${this.state.action}&username=${formData.userName}&password=${formData.password}`
            + `&r_userName=${formData.r_userName}&r_password=${formData.r_password}&r_confirmPassword=${formData.r_confirmPassword}`,
            myFetchOptions)


        // 成功回调函数, 这里将响应解析为 json格式
            .then(response => {
                    return response.json()
                }
            )
            // 从 响应数据中取值
            .then((json) => {
                this.setState({userNickName: json.NickUserName, userid: json.UserId})
                if (this.state.action === 'login') {
                    this.setState({hasLogin: true})
                }
            })

        // 登录行为的额外逻辑        // 定义成功消息
        message.success('请求成功')
        this.setModalVisible(false)
    }


    // login 方法用来展示 <Modal> 对话框
    login() {
        this.setModalVisible(true)
    }

    render() {
        let {getFieldProps} = this.props.form

        const userShow = this.state.hasLogin ?
            <Link to='/usercenter'>
                <Icon type="inbox" />
            </Link>
            :
            <Icon type="user" onClick={this.login.bind(this)}/>


        return (
            <div id='mobileheader'>
                <header>
                    <img src="src/images/logo.png" alt="logo"/>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal title='用户中心' wrapClassName='vertical-center-modal'
                       visible={this.state.modalVisible}
                       onCancel={() => {
                           this.setModalVisible(false)
                       }}
                       onOk={() => {
                           this.setModalVisible(false)
                       }} okText='关闭'>
                    <Tabs type='card' onChange={this.handleTabChange.bind(this)}>
                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password"
                                           placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password"
                                           placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="登陆" key="1">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password"
                                           placeholder="请输入您的密码" {...getFieldProps('password')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登陆</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>

            </div>
        )
    }
}

export default MobileHeader = Form.create({})(MobileHeader)
