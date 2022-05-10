import { FETCH_COMMENT_FOR_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from "../constants/actionTypes";
export default (comments = [], action) => {
    switch (action.type) {
        case FETCH_COMMENT_FOR_POST:
            return action.payload;
        case ADD_COMMENT:
            return action.payload;
        case UPDATE_COMMENT:
            return action.payload;
        case DELETE_COMMENT:
            console.log(comments.filter((comment) => comment._id != action.payload))
            return comments.filter((comment) => comment._id != action.payload);
        default:
            return comments;
    }
}