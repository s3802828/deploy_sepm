import * as api from "../api/user";
import { SIGN_UP, LOGIN, GET_ROLE, LOGOUT } from "../constants/actionTypes";

export const getRole = () => async (dispatch) => {
    try {
        var data = []
        const isAdmin = await api.checkAdmin()
        const isUser = await api.checkUser()
        var userInfo = null
        if (isAdmin.data.isAdmin){
            data.push('admin')
            userInfo = isAdmin.data.userInfo
        }
        if (isUser.data.isUser){
            data.push('user')
            userInfo = isUser.data.userInfo
        }
        
        dispatch({type: GET_ROLE, payload: data, userInfo: userInfo})
    } catch (error) {
        console.log(error)
    }
}

export const signUp = (registrant) => async (dispatch) => {
    try {
        const { data } = await api.signUp(registrant)
        dispatch({type: SIGN_UP, payload: data})
        if(data.message == null){
            window.location.replace('/');
        }
    } catch (error) {
        console.log(error)
    }
}

export const login = (user) => async (dispatch) => {
    try {
        const {data} = await api.login(user)
        dispatch({type: LOGIN, payload: data})
        if(data.message == null){
            window.location.replace('/');
        }
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({type: LOGOUT})
    } catch (error) {
        console.log(error)
    }
}
