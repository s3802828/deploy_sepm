var router = require('express').Router();

var { fetchOwnedPosts } = require('../../controllers/ProfilePage/fetchOwnedPosts');
var { fetchSavedFunction} = require('../../controllers/ProfilePage/fetchSavedFunction')
var { fetchUser } = require("../../controllers/ProfilePage/personalInfo")

router.get('/profile/ownedposts/:user_id', fetchOwnedPosts);
router.get('/profile/savedfunctions/:user_id', fetchSavedFunction);
router.get('/profile/:user_id', fetchUser)
// router.get('/profile/savedtopics/:user_id', fetchSavedTopic);

module.exports = router;