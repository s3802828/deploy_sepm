import * as api from '../api'
import { CREATE_FUNCTION, UPDATE_FUNCTION, DELETE_FUNCTION } from '../constants/actionTypes';

//Action Creators
export const addFunction = (newFunction) => async (dispatch) => {
    try {
        const { data } = await api.addFunction(newFunction);

        console.log("success")

        dispatch({ type: CREATE_FUNCTION, payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const updateFunction = (updateFunction) => async (dispatch) => {
    try {
        const { data } = await api.updateFunction(updateFunction);

        console.log("success")

        dispatch({ type: UPDATE_FUNCTION, payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const deleteFunction = (deleteFunction) => async (dispatch) => {
    try {
        await api.deleteFunction(deleteFunction);

        console.log("success")

        dispatch({ type: DELETE_FUNCTION, payload: deleteFunction });
    }
    catch (error) {
        console.log(error.message);
    }
}
