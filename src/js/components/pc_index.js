import React from 'react'
import PCHeader from './pc_header'
import PCFooter from './pc_footer'
import PCNewsContainer from './pc_newscontainer'


export default class PCIndex extends React.Component {
    constructor() {
        super()
        this.state = {
            current: 'top',
        }
    }

    handleNavClick(value) {
        // console.log(value)
        this.setState({current: value})
    }


    render() {
        return (
            <div>
                <PCHeader navHandler={this.handleNavClick.bind(this)}/>
                <PCNewsContainer current={this.state.current}/>
                <PCFooter/>
            </div>
        )
    }
}

