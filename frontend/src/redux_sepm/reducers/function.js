import { SAVE, FETCH_BY_TOPIC, SEARCH_FUNCTION, FETCH_BY_FUNCTION, CREATE_FUNCTION, UPDATE_FUNCTION, UNSAVE, DELETE_FUNCTION } from '../constants/actionTypes';

export const functions = (funct = [], action) => {
    switch (action.type) {
        case FETCH_BY_TOPIC:
            return action.payload;
        case SAVE:
            return funct;
        case FETCH_BY_FUNCTION:
            return action.payload;
        case CREATE_FUNCTION:
            return [...funct, action.payload];
        case UPDATE_FUNCTION:
            return [...funct, action.payload]
        case DELETE_FUNCTION:
            return funct.filter((func) => func._id != action.payload)
        default:
            return funct;
    }
}

export const searchReducer = (state = null, action) => {
    switch (action.type) {
        case SEARCH_FUNCTION:
            return action.payload;
        default:
            return state;
    }
}