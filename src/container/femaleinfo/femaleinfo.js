import React from 'react'
import {NavBar, Icon, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-seletor/avatar-seletor'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {update}
)

export default class FemaleInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            desc:'',
            name:'',
            age:''
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        console.log(this.props);
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">Lady's Setting</NavBar>
                <AvatarSelector selectAvatar={(imgname) => this.setState({
                    avatar: imgname
                })}>
                </AvatarSelector>
                <InputItem
                    onChange={(v) => this.onChange('title', v)}
                >
                    Name
                </InputItem>
                <InputItem
                    onChange={(v) => this.onChange('name', v)}
                >
                    Nickname
                </InputItem>
                <InputItem
                    onChange={(v) => this.onChange('age', v)}
                >
                    Age
                </InputItem>
                <TextareaItem
                    onChange={(v) => this.onChange('desc', v)}
                    rows={3}
                    title='Info'
                    autoHeight
                >
                </TextareaItem>
                <Button type='primary' onClick={() => this.props.update(this.state)}>Save</Button>
            </div>
        )
    }
}
