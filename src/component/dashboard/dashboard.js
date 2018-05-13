import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../../component/navlink/navlink'
import {Switch, Route} from 'react-router-dom'
import Male from '../../component/male/male'


function Female() {
    return <h2>Female page</h2>

}

function Msg() {
    return <h2>MSG page</h2>

}

function User() {
    return <h2>User page</h2>

}

@connect(
    state => state
)

export default class Dashboard extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/male',
                text: 'Ladys list',
                icon: 'male',
                title: 'Find Ladys',
                component: Male,
                hide: user.type == 'female'
            },
            {
                path: '/female',
                text: 'Gent',
                icon: 'female',
                title: 'Find Gents',
                component: Female,
                hide: user.type == 'male'
            },
            {
                path: '/msg',
                text: 'Message',
                icon: 'msg',
                title: 'Message',
                component: Msg,
            },
            {
                path: '/me',
                text: 'Me',
                icon: 'user',
                title: 'My profile',
                component: User,
            }
        ]
        return (
            <div>
                <NavBar className='fixd-header' mode='dard'>{navList.find(v => v.path == pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(item => (
                            <Route key={item.path} path={item.path} component={item.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>

        )
    }

}