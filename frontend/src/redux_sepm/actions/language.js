import * as api from '../api';
import { UNSAVE, SAVE, FETCH_ALL, FETCH_BY_LANGUAGE, FETCH_BY_TOPIC, SEARCH_FUNCTION, FETCH_BY_FUNCTION } from '../constants/actionTypes';

export const getLanguage = () => async (dispatch) => {
    try {

        const { data } = await api.fetchLang();

        dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const getTopicFromLang = (id) => async (dispatch) => {
    try {

        const { data } = await api.fetchTopicsForLanguage(id);

        dispatch({ type: FETCH_BY_LANGUAGE, payload: data });

        if (!data) {
            window.location.replace("/*")
        }

    } catch (error) {
        console.log(error.message);
    }
}

export const getFunctionFromTopic = (id) => async (dispatch) => {
    try {

        const { data } = await api.fetchFunctionsForTopic(id);

        dispatch({ type: FETCH_BY_TOPIC, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const getDetailFromFunction = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchDetailForFunction(id);

        dispatch({ type: FETCH_BY_FUNCTION, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const searchFunction = (id, keyword) => async (dispatch) => {
    try {
        const topics = await api.searchForTopic(id, keyword);
        const functs = await api.searchForFunction(id, keyword);
        const data = {
            topics: topics.data,
            functions: functs.data
        }
        dispatch({ type: SEARCH_FUNCTION, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}



export const savedFunction = (id, user_id) => async (dispatch) => {

    try {

        const { data } = await api.saveFunction(id, user_id);

        console.log("Action");

        dispatch({ type: SAVE, payload: data });

    } catch (error) {

        console.log(error.message);

    }
}

export const unsavedFunction = (id, user_id) => async (dispatch) => {

    try {
        const { data } = await api.unsaveFunction(id, user_id);
        console.log("action")
        dispatch({ type: UNSAVE, payload: data });

    } catch (error) {

        console.log(error.message);

    }
}