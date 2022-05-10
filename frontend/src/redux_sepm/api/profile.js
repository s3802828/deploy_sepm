import axios from 'axios'

const endPoint = "/profile";

export const fetchOwnedPosts = (user_id) => axios.get(endPoint + 'page/profile/ownedposts/' + user_id);
export const fetchSavedFunction = (user_id) => axios.get(endPoint + 'page/profile/savedfunctions/' + user_id);
export const updateAvatar = (user_id, avatar) => axios.put(endPoint + '/ava/'+ user_id, avatar, {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
});
export const fetchUser = (user_id) => axios.get("/profilepage/profile/" + user_id);
export const updateProfile = (updateProfile) => axios.put("/user/update/", updateProfile)

