import axios from 'axios';
const endPoint = ""
export const getPostByTopic = (cate_id) => axios.get(endPoint + "/post/get/" + cate_id)
export const getGeneralPost = (lang_id) => axios.get(endPoint + "/post/get/general/" + lang_id)
export const getPopularPost = (lang_id) => axios.get(endPoint + "/post/get/popular/" + lang_id)
export const likePost = (post_id, user_id) => axios.put(endPoint + "/discussion/posts/like/" + user_id, {
    _id: post_id
})
export const dislikePost = (post_id, user_id) => axios.put(endPoint + "/discussion/posts/dislike/" + user_id, {
    _id: post_id
})

export const searchPostByTopic = (category_id, keyword) => axios.get(endPoint + "/post/search/topic/" + category_id + "/" + keyword)
export const searchPostByLanguage = (lang_id, keyword) => axios.get(endPoint + "/post/search/language/" + lang_id + "/" + keyword)