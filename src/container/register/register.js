import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {register}
)

export default class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'male'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        this.props.register(this.state)
        console.log(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ?
                    <Redirect to={this.props.redirectTo}></Redirect> : null
                }
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={(v) => this.handleChange('user', v)}>Username</InputItem>
                        <InputItem type='password' onChange={(v) => this.handleChange('pwd', v)}>Password</InputItem>
                        <InputItem type='password'
                                   onChange={(v) => this.handleChange('repeatpwd', v)}>Re-type</InputItem>
                        <RadioItem checked={this.state.type === "male"}
                                   onChange={(v) => this.handleChange('type', 'male')}>Gent</RadioItem>
                        <RadioItem checked={this.state.type === "female"}
                                   onChange={(v) => this.handleChange('type', 'female')}>Lady</RadioItem>
                        <WhiteSpace></WhiteSpace>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.handleRegister}>Register</Button>
                    </List>
                </WingBlank>

            </div>
        )
    }
}