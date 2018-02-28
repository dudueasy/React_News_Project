import React from 'react';
import {
    Row, Col,
    Menu, Icon,
    Tabs, message,
    Form, Input,
    Button, Checkbox,
    Modal
} from 'antd';

import {Link} from 'react-router-dom'


const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane
const MenuItemGroup = Menu.ItemGroup

class PCHeader extends React.Component {
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


    }

    handleNavClick(e) {
        this.props.navHandler(e.key)
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
                // 注册请求的响应逻辑
                if (this.state.action === 'register') {
                    message.success('注册成功, 请重新登陆')
                }

                // 登陆请求的响应逻辑
                if (this.state.action === 'login') {
                    this.setState({hasLogin: true})
                    localStorage.userid = json.UserId
                    localStorage.userNickName = json.NickUserName
                    message.success('登陆成功')
                }
            })

        // 将对话框隐藏
        this.setModalVisible(false)
    }

    // 登出
    logout() {
        // 清除localStorage 中的用户数据
        localStorage.userid = ''
        localStorage.userNickName = ''
        // 重置 state
        this.setState({hasLogin: false})
        message.success('用户已注销')
    }


// 在 render(){} 里面才能写 React 表达式
    render() {
        let {getFieldDecorator} = this.props.form;

        // 这里定义一个React 元素, 根据this.state.hasLogin 来决定元素的内容
        const userShow = this.state.hasLogin ?
            <Menu.Item key='logout' class='register'>
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target='_blank' to='/usercenter'>
                    <Button type='dashed' htmlType='button'>个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>

            </Menu.Item>
            :
            <Menu.Item key='register' class='register'>
                <Icon type="user"/>注册登录
            </Menu.Item>


        return (
            <header class="pc-header">
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="/src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode='horizontal' onClick={this.handleNavClick.bind(this)}
                              selectedKeys={[this.state.current]}>
                            <Menu.Item key='top'>
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key='yule'>
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key='shehui'>
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key='guonei'>
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key='guoji'>
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key='tiyu'>
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key='keji'>
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                        </Menu>
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
                                            {getFieldDecorator('r_userName')(<Input placeholder="请输入您的账号"/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password')(<Input type="password"
                                                                                    placeholder="请输入您的密码"/>)}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword')(<Input type="password"
                                                                                           placeholder="请再次输入您的密码"/>)}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="登陆" key="1">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('userName')(<Input placeholder="请输入您的账号"/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(<Input type="password"
                                                                                  placeholder="请输入您的密码"/>)}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登陆</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>

                    <Col span={2}>
                        <Menu mode='horizontal' onClick={this.handleClick.bind(this)}>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={1}/>

                </Row>
            </header>
        )
    }
}

export default PCHeader = Form.create({})(PCHeader)
