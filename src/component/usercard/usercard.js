import React from 'react'
import PropTypes from "prop-types";
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

export default class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar ? (<Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={v.avatar ? require(`../img/${v.avatar}.png`) : require(`../img/girl.png`)}
                            extra={<span>{v.title}</span>}
                        ></Header>
                        <Body>
                        {v.desc.split('\n').map(d => (
                            <div key={d}>{d}</div>
                        ))}
                        </Body>
                    </Card>) : null
                ))}
            </WingBlank>
        )
    }
}