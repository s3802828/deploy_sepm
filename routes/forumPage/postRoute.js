var { addPost, updatePost, deletePost, fetchPostDetail, fetchCommentForPost,  likePost, dislikePost} = require('../../controllers/forumPage/posts');
var { removeCommentsFromPost } = require('../../middlewares/cascade');
const { route } = require('./postDetailsRoute');
var router = require('express').Router();

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../../frontend/public/postUploads')
    }

})

var upload = multer({
    storage
});


router.post('/posts', upload.single('images'), addPost)
router.put('/posts/update', upload.single('images'), updatePost)
router.delete('/posts/delete/:id',[removeCommentsFromPost] , deletePost)
router.get('/posts/:id', fetchPostDetail)
router.get('/comment/:post_id', fetchCommentForPost)
router.put('/posts/like/:id', likePost)
router.put('/posts/dislike/:id', dislikePost)

module.exports = router;