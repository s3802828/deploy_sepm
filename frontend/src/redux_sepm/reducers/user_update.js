import { UPDATE_AVATAR, CHANGE_PASSWORD, ADD_ADMIN, UPDATE_USER_INFO } from "../constants/actionTypes";

export default (user = [], action) => {
    switch (action.type) {
        case UPDATE_AVATAR:
            return [...user, action.payload];

        case CHANGE_PASSWORD:
            return [...user, action.payload];

        case ADD_ADMIN:
            return [action.payload];
        case UPDATE_USER_INFO:
            return action.payload;
        default:
            console.log("Default");
            return user;
    }
}