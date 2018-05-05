import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const avatarList = 'girl,boy,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,man,pig,whale,zebra'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
            text: v
        }))
        const gridHeader = this.state.text
            ? (<div>
                <span>Your Avatar: </span>
                <img style={{width: 20}} src={this.state.icon} alt=""/>
            </div>)
            :
            'Please choose your avatar'
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid data={avatarList} activeStyle={false} columnNum={4} onClick={elem => {
                        this.setState(elem)
                        this.props.selectAvatar(elem.text)
                    }}>
                    </Grid>
                </List>

            </div>
        )
    }

}