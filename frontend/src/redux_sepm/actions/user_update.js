import * as api from "../api";
import { CHANGE_PASSWORD, ADD_ADMIN } from "../constants/actionTypes";

export const changePassword = (user_id, pass) => async (dispatch) => {
    try {
        const {data} = await api.changePassword(user_id, pass);

        console.log("change password action")

        dispatch({ type: CHANGE_PASSWORD, payload: data });

        if (data.message == null) {
            window.location.replace("/");
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const addAdmin = (user) => async (dispatch) => {
    try {
        const {data} = await api.addAdmin(user);

        console.log("add admin action")

        dispatch({ type: ADD_ADMIN, payload: data });
        console.log(data.message)
        if(data.message == null){
            window.location.replace('/');
        }
    } catch (error) {
        console.log(error)
    }
}