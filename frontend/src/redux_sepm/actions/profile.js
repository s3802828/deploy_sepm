import * as api from '../api/profile'
import { FETCH_SAVED_FUNCTION, FETCH_OWNED_POSTS, UPDATE_AVATAR } from '../constants/actionTypes';

export const getOwnedPosts = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchOwnedPosts(id);

        dispatch({ type: FETCH_OWNED_POSTS, payload: data});

    } catch (error) {
        console.log(error.message);
    }
}

export const getSavedFunction = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchSavedFunction(id);
        console.log("ffff")

        dispatch({ type: FETCH_SAVED_FUNCTION, payload: data});

    } catch (error) {
        console.log(error.message);
    }
} 


export const updateAva = (user_id, avatar) => async (dispatch) => {
    try {
        console.log("updateAvaaaaa")
        const {data} = await api.updateAvatar(user_id, avatar);
        window.location.replace(`/client/profile/${user_id}`)
        dispatch({ type: UPDATE_AVATAR, payload: data });
        
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (updateProfile) => async (dispatch) => {
    console.log(updateProfile)
    try {
        const { data } = await api.updateProfile(updateProfile);

        console.log("success")

        dispatch({ type: "UPDATE_PROFILE", payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const fetchUser = (user_id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(user_id);

        dispatch({ type: "FETCH_USER", payload: data });
    } catch (error) {
        console.log(error)
    }
}