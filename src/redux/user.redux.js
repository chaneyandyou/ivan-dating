import axios from 'axios'
import {getRedirectPath} from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    user: '',
    type: ''
}

//reducer

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOGIN_SUCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
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

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

function loginSuccess(data) {
    return {type: LOGIN_SUCESS, payload: data}

}

//cookies
export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
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
                    dispatch(loginSuccess(res.data.data))
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
                    dispatch(registerSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}