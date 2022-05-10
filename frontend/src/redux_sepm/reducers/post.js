import { CREATE_POST, DELETE_POST, UPDATE_POST, FETCH_POST_DETAIL, FETCH_BY_TOPIC, FETCH_GENERAL, FETCH_POPULAR, LIKE, DISLIKE } from "../constants/actionTypes";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_BY_TOPIC:
        case FETCH_GENERAL:
        case FETCH_POPULAR:
            return action.payload;
        case LIKE:
            return posts;
        case DISLIKE:
            return posts;
        case CREATE_POST:
            //console.log("CREATE_POST");
            return [...posts, action.payload];
        case UPDATE_POST:
            //console.log("UPDATE_POST");
            return [...posts, action.payload];
        case DELETE_POST:
            //console.log("DELETE POST");
            return posts.filter((post) => post._id != action.payload)
        case FETCH_POST_DETAIL:
            return action.payload;
        default:
            return posts;
    }
}