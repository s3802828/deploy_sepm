import { UPDATE_AVATAR, FETCH_USER } from "../constants/actionTypes";

export default (user = [], action) => {
    switch (action.type) {
        case UPDATE_AVATAR:
            return [...user, action.payload];
        case FETCH_USER:
            return action.payload;
        default:
            return user;
    }
}