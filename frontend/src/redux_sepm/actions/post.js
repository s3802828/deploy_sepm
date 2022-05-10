import { FETCH_BY_TOPIC, FETCH_GENERAL, FETCH_POPULAR, LIKE, DISLIKE, SEARCH_FUNCTION } from "../constants/actionTypes";
import * as api from '../api/post';

export const getPostFromTopic = (id) => async (dispatch) => {
    try {

        const { data } = await api.getPostByTopic(id);

        dispatch({ type: FETCH_BY_TOPIC, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const getGeneralPosts = (id) => async (dispatch) => {
    try {

        const { data } = await api.getGeneralPost(id);

        dispatch({ type: FETCH_GENERAL, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const getPopularPosts = (id) => async (dispatch) => {
    try {

        const { data } = await api.getPopularPost(id);

        dispatch({ type: FETCH_POPULAR, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const like = (post_id, user_id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(post_id, user_id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const dislike = (post_id, user_id) => async (dispatch) => {
    try {
        const { data } = await api.dislikePost(post_id, user_id);

        dispatch({ type: DISLIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const searchPostsByTopic = (category_id, keyword) => async (dispatch) => {
    try {
        const {data} = await api.searchPostByTopic(category_id, keyword)
        dispatch({type: SEARCH_FUNCTION, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const searchPostsByLanguage = (lang_id, keyword) => async (dispatch) => {
    try {
        const {data} = await api.searchPostByLanguage(lang_id, keyword)
        dispatch({type: SEARCH_FUNCTION, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}