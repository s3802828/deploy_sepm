import { FETCH_OWNED_POSTS} from "../constants/actionTypes";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_OWNED_POSTS:
            return action.payload;
        default:
            return posts;
    }
}