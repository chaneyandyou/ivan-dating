import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)
export default class Male extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getUserList('female')
    }

    render() {
        return (
            <UserCard userlist={this.props.userlist}></UserCard>
        )
    }

}