import React from 'react'
import logoImg from './logo2.png'
import './logo.css'

export default class Logo extends React.Component{
    render(){
        return(
            <div className="logoConatiner">
                <img src={logoImg} alt=""/>
                <h2 className='dateTitle'>IVAN DATING APP</h2>
                <h4>Find your true love here</h4>
            </div>
        )
    }
}