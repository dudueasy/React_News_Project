import React from 'react'
import ReactDOM from 'react-dom'
import { List } from 'antd';


export default class AntdList extends React.Component {
    render() {
        return (
            <div>
                <h3 style={{marginBottom: 16}}>Default Size</h3>
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>)

    }
}