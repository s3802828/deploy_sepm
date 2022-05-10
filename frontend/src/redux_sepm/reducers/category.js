import { FETCH_BY_LANGUAGE } from "../constants/actionTypes";

export default (category = [], action) => {
    switch (action.type) {
        case FETCH_BY_LANGUAGE:
            return action.payload;
        default:
            return category;
    }
}