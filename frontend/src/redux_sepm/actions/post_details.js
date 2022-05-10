import * as api from '../api';

export const addComment = (post) => async (dispatch) => {
    try {
        const { data } = await api.addComment(post);

        dispatch({ type: 'ADD_COMMENT', payload: data });

    } catch (error) {
        console.log(error)
    }
}

export const updateComment = (post) => async (dispatch) => {
    try {
        const { data } = await api.updateComment(post);

        dispatch({ type: 'UPDATE_COMMENT', payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = (id) => async (dispatch) => {
    try {
        await api.deleteComment(id);

        dispatch({ type: 'DELETE_COMMENT', payload: id });
    } catch (error) {
        console.log(error)
    }
}