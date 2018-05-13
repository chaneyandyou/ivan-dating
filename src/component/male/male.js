import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'


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
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={v.avatar ? require(`../img/${v.avatar}.png`) : require(`../img/girl.png`)}
                            extra={<span>{v.title}</span>}
                        ></Header>
                        <Body>

                        {v.desc.split('\n').map(d=>(
                            <div key={d}>{d}</div>
                        ))}
                        </Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }

}