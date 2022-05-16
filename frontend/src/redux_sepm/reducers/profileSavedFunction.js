import { FETCH_SAVED_FUNCTION, UNSAVE } from "../constants/actionTypes";

export default (func = [], action) => {
    switch (action.type) {
        case FETCH_SAVED_FUNCTION:
            return action.payload;
        case UNSAVE:
            return action.payload;
        default:
            return func;
    }
}