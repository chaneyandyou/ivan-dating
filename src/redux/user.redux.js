import axios from 'axios'
import {getRedirectPath} from "../util";

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

//reducer

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
    return state
}

//action
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}

}

function authSuccess(obj) {
    const {pwd, ...data} = obj
    return {type: AUTH_SUCCESS, payload: data}
}


//cookies
export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

//login logic
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('You are missing something')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

//http request
export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('You are missing something')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('password not same')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}