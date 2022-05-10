var router = require('express').Router();

var {fetchPostsForTopic, fetchGeneralPosts, fetchPopularPosts} = require('../../controllers/forumPage/fetchPost');
var {searchPostInTopic, searchPostInLanguage} = require('../../controllers/forumPage/posts')

router.get('/get/:category_id', fetchPostsForTopic)
router.get('/get/general/:language_id', fetchGeneralPosts)
router.get('/get/popular/:language_id', fetchPopularPosts)
router.get('/search/topic/:cate_id/:keyword', searchPostInTopic)
router.get('/search/language/:language_id/:keyword', searchPostInLanguage)

module.exports = router

