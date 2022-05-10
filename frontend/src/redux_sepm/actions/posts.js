import * as api from '../api'

import { CREATE_POST, UPDATE_POST, DELETE_POST, FETCH_POST_DETAIL, FETCH_COMMENT_FOR_POST } from '../constants/actionTypes';


//Action Creators
export const addPost = (newPost) => async (dispatch) => {
    try {
        console.log(newPost.user_id)
        const { data } = await api.addPost(newPost);

        console.log("success")

        dispatch({ type: CREATE_POST, payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (updatePost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(updatePost);

        console.log("success")

        dispatch({ type: UPDATE_POST, payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (deletePost) => async (dispatch) => {
    try {
        await api.deletePost(deletePost);

        console.log("success")

        dispatch({ type: DELETE_POST, payload: deletePost });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const getPostDetail = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostDetail(id);
        if (!data) {
            window.location.replace("/*")
        }

        dispatch ({type: FETCH_POST_DETAIL, payload: data});
    } catch (error) {
        console.log(error.message)
    }
}

export const getCommentForPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchCommentForPost(id);

        dispatch ({type: FETCH_COMMENT_FOR_POST, payload: data});
    } catch (error) {
        console.log(error.message)
    }
}

