import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import{loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
    null,
    {loadData}
)

export default class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register',]
        const pathname = this.props.location.pathname
        console.log(pathname);
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        //get user info
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //log in info
                    this.props.loadData(res.data.data)
                } else {
                    this.props.history.push('/login')
                }
            }
        })
        //login or not

        //现在的url地址,login是不需要跳转的

        //用户的type 身份是男还是女

        //用户信息是否完善(选择头像,个人简介)
    }

    render() {
        return (
            null
        )
    }

}