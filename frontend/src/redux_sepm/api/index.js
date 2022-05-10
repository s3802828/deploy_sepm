import axios from 'axios'

const endPoint = "/";

export const fetchLang = () => axios.get(endPoint + '/cheatsheet/languages');

export const fetchTopicsForLanguage = (langId) => axios.get(endPoint + '/cheatsheet/language/' + langId);

export const fetchFunctionsForTopic = (langId) => axios.get(endPoint + '/cheatsheet/topic/' + langId);

export const saveFunction = (id, user_id) => axios.put(endPoint + "/saved/function/"+ id +"/save", {
    _id: user_id
});

export const unsaveFunction = (id, user_id) => axios.put(endPoint + "/saved/function/"+ id +"/unsave", {
    _id: user_id
});

export const fetchDetailForFunction = (funcId) => axios.get(endPoint + '/function/' + funcId);

export const searchForTopic = (id, keyword) => axios.get(endPoint + '/cheatsheet/search/topic/' + id + "/" +keyword)

export const searchForFunction = (id, keyword) => axios.get(endPoint + '/cheatsheet/search/function/' + id + "/" + keyword)

export const addFunction = (newFunction) => axios.post(endPoint + '/cheatsheet/functions', newFunction)

export const updateFunction = (updateFunction) => axios.put(endPoint + '/cheatsheet/functions/update', updateFunction)

export const deleteFunction = (deleteFunction) => axios.delete(endPoint + '/cheatsheet/functions/delete/' + deleteFunction)

export const addPost = (newPost) => axios.post(endPoint + '/discussion/posts', newPost, {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
});

export const updatePost = (updatePost) => axios.put(endPoint + '/discussion/posts/update', updatePost)

export const deletePost = (deletePost) => axios.delete(endPoint + '/discussion/posts/delete/' + deletePost)

export const fetchPostDetail = (post_id) => axios.get(endPoint + '/discussion/posts/' + post_id)
export const addComment = (comment) => axios.post(endPoint + '/postdetails/comment', comment, {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
});

export const updateComment = (comment) => axios.put(endPoint + '/postdetails/comment/update', comment, {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
});

export const deleteComment = (comment_id) => axios.delete(endPoint + '/postdetails/comment/delete/' + comment_id);
export const fetchCommentForPost = (post_id) => axios.get(endPoint + '/discussion/comment/' + post_id)

export const changePassword = (user_id, data) => axios.put(endPoint + '/user/changepass/' + user_id, data);
export const addAdmin = (data) => axios.post(endPoint + '/user/addadmin', data);
