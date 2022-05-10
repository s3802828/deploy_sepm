import { FETCH_BY_TOPIC} from "../constants/actionTypes";

export default (topic = [], action) => {
    switch (action.type) {
        case FETCH_BY_TOPIC:
            return action.payload;
        default:
            console.log("Default");
            return topic;
    }
}